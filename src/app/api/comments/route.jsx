import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import client from "../../../../lib/prisma";

export async function POST(req) {
    try {
        const body = await req.json();
        const {comment, rating, id} = body
        
        const session = await getServerSession(authOptions);
        if(!session) {
            return new NextResponse("Unathenticated", { status: 403 } )
        }

        const result = await client.comment.create({
            data: {
                content: comment,
                rating: rating,
                user: {
                    connect: {email: session?.user?.email},
                },
                product: {
                    connect: {id: id}
                }
            },
        });

        
        // getting author email
        const author = await client.product.findUnique({
            where: {
                id: id
            },
            include: {
                user: true
            }
        })

        const isAuthor = author.user.email === session?.user?.email
        if(!isAuthor) {
            let avg;
            // calculating average of user ratings
            const comments = await client.comment.findMany({
                where: {
                    productId: id,
                    userId: { 
                        not: author.user.id 
                    }
                },
            })
            
            if (comments.length === 0) {
                avg = 0;
            }
            
            const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
            avg = totalRating / comments.length;

            await client.product.update({
                where: { 
                    id: id 
                },
                data: { 
                    rating: avg
                },
            });
        }

        return NextResponse.json({
            result,
            success: 'Comment added'
        });
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
};