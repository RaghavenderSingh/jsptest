// app/api/submitSwikarData/route.ts
import prisma from '@/app/db';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    try {
        const { topics, otherTopic } = await request.json();

        const suggestion = await prisma.suggestion.create({
            data: {
                topics,
                otherTopic,
            },
        });

        return NextResponse.json({ success: true, suggestion }, { status: 201 });
    } catch (error) {
        console.error('Error submitting suggestion:', error);
        return NextResponse.json({ success: false, error: 'Error submitting suggestion' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}