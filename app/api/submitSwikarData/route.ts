// app/api/submitSwikarData/route.ts
import prisma from '@/app/db';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, state, district, block, hours } = body;

        const data = await prisma.swikarData.create({
            data: {
                type,
                state,
                district,
                block,
                hours: hours ? parseInt(hours) : null,
            },
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error submitting Swikar data:', error);
        return NextResponse.json({ success: false, error: 'Error submitting data' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}