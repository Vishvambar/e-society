import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Complaint from '@/models/Complaint';
import { getSession } from '@/lib/auth';

export async function PATCH(req, { params }) {
    try {
        const session = await getSession(req);
        if (!session || session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;
        const { status } = await req.json();

        const updated = await Complaint.findByIdAndUpdate(id, { status }, { new: true });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
