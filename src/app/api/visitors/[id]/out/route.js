import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Visitor from '@/models/Visitor';
import { getSession } from '@/lib/auth';

export async function POST(req, { params }) {
    try {
        const session = await getSession(req);
        if (!session || (session.role !== 'SECURITY' && session.role !== 'ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;

        const visitor = await Visitor.findByIdAndUpdate(id, { outTime: new Date() }, { new: true });

        return NextResponse.json(visitor);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
