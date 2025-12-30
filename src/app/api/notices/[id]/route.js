import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Notice from '@/models/Notice';
import { getSession } from '@/lib/auth';

export async function DELETE(req, { params }) {
    try {
        const session = await getSession(req);
        if (!session || session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;

        await Notice.findByIdAndDelete(id);

        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
