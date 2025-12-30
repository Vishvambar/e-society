import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Complaint from '@/models/Complaint';
import { getSession } from '@/lib/auth';

export async function GET(req) {
    try {
        const session = await getSession(req);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        await dbConnect();

        // Residents see only theirs, Admins see all (but Admins usually use Server Actions/DB fetch in page)
        const query = session.role === 'RESIDENT' ? { resident: session.id } : {};

        const complaints = await Complaint.find(query).sort({ createdAt: -1 });
        return NextResponse.json(complaints);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const session = await getSession(req);
        if (!session || session.role !== 'RESIDENT') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { title, description } = await req.json();

        const complaint = await Complaint.create({
            resident: session.id,
            title,
            description,
            status: 'OPEN'
        });

        return NextResponse.json(complaint, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
