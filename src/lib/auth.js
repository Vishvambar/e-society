import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'default_secret_key_change_me_in_production'
);

export async function signJWT(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(secret);
}

export async function verifyJWT(token) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
}

export async function getSession(request) {
    const token = request.cookies.get('token')?.value;
    if (!token) return null;
    return await verifyJWT(token);
}
