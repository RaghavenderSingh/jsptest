import { NextResponse } from 'next/server'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3 } from '@/lib/s3'

export async function POST() {
    try {
        const filename = `upload-${Date.now()}.png` // Generate a unique filename

        const signedUrl = await getSignedUrl(
            s3,
            new PutObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: filename,
                ContentType: 'image/png',
            }),
            { expiresIn: 3600 } // URL expires in 1 hour
        )

        return NextResponse.json({ url: signedUrl, filename: filename })
    } catch (err) {
        console.error('Error generating signed URL:', err)
        return NextResponse.json({ message: 'Error generating signed URL' }, { status: 500 })
    }
}