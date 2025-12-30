import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Bill from '@/models/Bill';
import { getSession } from '@/lib/auth';

export async function POST(req, { params }) {
    try {
        const session = await getSession(req);
        if (!session || session.role !== 'RESIDENT') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;

        // Ensure bill belongs to user
        const bill = await Bill.findOne({ _id: id, resident: session.id });
        if (!bill) {
            return NextResponse.json({ error: 'Bill not found' }, { status: 404 });
        }

        bill.status = 'PAID';
        await bill.save();

        return NextResponse.json({ message: 'Payment successful', bill });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
