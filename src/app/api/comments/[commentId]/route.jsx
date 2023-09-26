import { NextResponse } from "next/server";
import client from "../../../../../lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function PATCH(req, {params}) {
    try {
        const body = await req.json();
        const { newContent, newRating } = body;

        if(!params.commentId) {
            return new NextResponse("Comment ID is required", { status: 403} )
        }

        const session = await getServerSession(authOptions);
        if(!session) {
            return new NextResponse("Unathenticated", { status: 403 } )
        }

        const author = await client.comment.findUnique({
            where: {
                id: params.commentId
            },
            select: {
                product: {
                    include: {
                        user: true
                    }
                }
            }
        })

        const result = await client.comment.update({
            where: {
                id: params.commentId
            },
            data: {
                content: newContent,
                rating: newRating
            },
        });

        const isAuthor = author.product.user.email === session?.user?.email
        if(!isAuthor) {
            let avg;
            // calculating average of user ratings
            const comments = await client.comment.findMany({
                where: {
                    productId: result.productId,
                    userId: { 
                        not: author.product.user.id 
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
                    id: result.productId 
                },
                data: { 
                    rating: avg
                },
            });
        }
    
        return NextResponse.json({
            result,
            success: 'Comment updated'
        });
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
};


export async function DELETE(req, {params}) {
    try {
        if(!params.commentId) {
            return new NextResponse("Comment ID is required", { status: 403} )
        }

        const session = await getServerSession(authOptions);
        if(!session) {
            return new NextResponse("Unathenticated", { status: 403 } )
        }

        const result = await client.comment.delete({
            where: {
                id: params.commentId
            }
        })
        
        // getting author email
        const author = await client.product.findUnique({
            where: {
                id: result.productId
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
                    productId: result.productId,
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
                    id: result.productId 
                },
                data: { 
                    rating: avg
                },
            });
        }


        return NextResponse.json({
            result,
            success: 'Comment deleted'
        })
    } catch(error) {
        return new NextResponse("Internal error", { status: 500});
    }
}