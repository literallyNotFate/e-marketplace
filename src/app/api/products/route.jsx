import { NextResponse } from "next/server";
import client from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, price, category, quantity, images } = body;

        const session = await getServerSession(authOptions);
        if(!session) {
            return new NextResponse("Unathenticated", { status: 403} )
        }

        const result = await client.product.create({
            data: {
                name,
                price,
                quantity,
                category,
                images,
                user: {
                    connect: {email: session?.user?.email}
                }                
            },
        });

        return NextResponse.json({
            result,
            success: 'Product added'
        });
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
};



export async function GET() {
    try {
        const products = await client.product.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        image: true
                    }
                },
                comments: {
                    select: {
                        id: true,
                        content: true,
                        rating: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            }
        });


        const session = await getServerSession(authOptions);
        const featured = session ? (await client.featured.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true
                    }  
                },
                product: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })) : null
    

        return NextResponse.json({
            products, featured
        });
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
};