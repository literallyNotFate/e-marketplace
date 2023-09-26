import { getServerSession } from 'next-auth';
import client from '../../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
    const session = await getServerSession(authOptions);
    if(!session) {
        return new NextResponse("Unathenticated", { status: 403} )
    }

    const body = await req.json();
    const { productId } = body

    try {
        const result = await client.featured.deleteMany({
            where: {
                userId: session.user.id,
                productId: productId,
            },
        });

        return NextResponse.json({
            result,
            success: 'Removed from featured'
        });
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
};