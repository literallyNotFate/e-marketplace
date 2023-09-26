import bcrypt from 'bcrypt';
import client from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const body = await request.json();
    const {username, email, password, image} = body;

    const exist = await client.user.findUnique({
        where: {
            email
        }
    });

    if(exist) {
        return new NextResponse('Email already exists!', {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await client.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            image
        }
    });

    return NextResponse.json({
        result,
        success: `${username} registered`
    });
}