import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Bill from '@/models/Bill';
import User from '@/models/User';
import { getSession } from '@/lib/auth';

export async function POST(req) {
    try {
        const session = await getSession(req);
        if (!session || session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { month, year, amount, dueDate } = await req.json();

        // Get all residents
        const residents = await User.find({ role: 'RESIDENT' });

        // Create bills
        const bills = residents.map(resident => ({
            resident: resident._id,
            amount,
            month,
            year,
            dueDate,
            status: 'PENDING'
        }));

        if (bills.length > 0) {
            await Bill.insertMany(bills);
        }

        return NextResponse.json({ message: `Generated ${bills.length} bills successfully` });
    } catch (error) {
        console.error('Billing Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
