import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Notice from '@/models/Notice';
import { getSession } from '@/lib/auth';

export async function GET() {
    await dbConnect();
    const notices = await Notice.find({}).sort({ createdAt: -1 });
    return NextResponse.json(notices);
}

export async function POST(req) {
    try {
        const session = await getSession(req);
        if (!session || session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { title, content, category } = await req.json();

        const notice = await Notice.create({
            title,
            content,
            category,
            postedBy: session.id
        });

        return NextResponse.json(notice, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
