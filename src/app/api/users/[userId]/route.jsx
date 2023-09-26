import { NextResponse } from "next/server"
import client from "../../../../../lib/prisma";

export async function GET(req, {params}) {
    try {
        if(!params.userId) {
            return new NextResponse("User ID is required", {status: 400})
        }

        const user = await client.user.findUnique({
            where: {
                id: params.userId,
            },
            select: {
                id: true,
                username: true,
                email: true,
                image: true,
                createdAt: true,
                products: true,
                comments: {
                    include: {
                        user: true
                    }
                },
                featured: {
                    include: {
                        product: true
                    }
                }
            }
        });
    
        return NextResponse.json(user);
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
};