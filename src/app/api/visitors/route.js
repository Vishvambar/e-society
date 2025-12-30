import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Visitor from '@/models/Visitor';
import { getSession } from '@/lib/auth';

export async function GET(req) {
    // Get Active Visitors only? Or filtering?
    // Let's allow query params or just return all ACTIVE for now if no params.
    // Admin checks all. Security checks active.
    // Simple: return all active by default.
    await dbConnect();
    const visitors = await Visitor.find({ outTime: { $exists: false } }).sort({ inTime: -1 });
    return NextResponse.json(visitors);
}

export async function POST(req) {
    try {
        const session = await getSession(req);
        // Allow SECURITY or ADMIN
        if (!session || (session.role !== 'SECURITY' && session.role !== 'ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { name, mobile, purpose, flatNo } = await req.json();

        const visitor = await Visitor.create({
            name,
            mobile,
            purpose,
            flatNo,
            gatekeeper: session.id,
            inTime: new Date()
        });

        return NextResponse.json(visitor, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
