import { NextResponse } from "next/server";
import client from "../../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { deleteImage } from "../../../../../lib/cloudinary";
import { getPublicIdFromUrl } from "../../../../../lib/utils";

export async function GET(req, { params }) {
    try {
        if (!params.productId) {
            return new NextResponse("Product ID is required", { status: 400 });
        }

        const product = await client.product.findUnique({
            where: {
                id: params.productId
            },
            include: {
                user: {
                    select: {
                        username: true,
                        image: true
                    }
                },
                comments: {
                    include: {
                        user: {
                            select: {
                                username: true,
                                image: true
                            }
                        },
                    },
                },
            },
        });


        // getting related products (random 4)
        const limit = 4
        const productsCount = await client.product.count()
        const skip = Math.max(0, Math.floor(Math.random() * productsCount) - limit)

        const related = await client.product.findMany({
            where: {
                id: { 
                    not: params.productId
                },
                category: product.category
            },
            take: limit,
            skip: skip
        });

        
        return NextResponse.json({
            ...product,
            related: related
        });
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
};


export async function PATCH(req, { params }) {
    try {
        const body = await req.json();
        const { name, price, category, quantity, images } = body;

        const session = await getServerSession(authOptions);
        if(!session) {
            return new NextResponse("Unathenticated", { status: 403} )
        }

        if (!params.productId) {
            return new NextResponse("Product ID is required", { status: 400 });
        }

        const imgsToDelete = await client.product.findUnique({
            where: {
                id: params.productId
            },
            select: {
                images: true
            }
        })

        for(let i = 0; i < imgsToDelete.images.length; i++) {
            const pid = getPublicIdFromUrl(imgsToDelete.images[i])
            deleteImage('e-marketplace', pid)
        }
        
        const result = await client.product.update({
            where: {
                id: params.productId
            },
            data: {
                name,
                price,
                category,
                quantity,
                images
            },
        });
    
        return NextResponse.json({
            result,
            success: 'Product edited'
        });
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
};


export async function DELETE(req, { params }) {
    try {
        const session = await getServerSession(authOptions);

        if(!session) {
            return new NextResponse("Unathenticated", { status: 403} )
        }

        if (!params.productId) {
            return new NextResponse("Product ID is required", { status: 400 });
        }

        const imgsToDelete = await client.product.findUnique({
            where: {
                id: params.productId
            },
            select: {
                images: true
            }
        })

        for(let i = 0; i < imgsToDelete.images.length; i++) {
            const pid = getPublicIdFromUrl(imgsToDelete.images[i])
            deleteImage('e-marketplace', pid)
        }

        const result = await client.product.delete({
            where: {
                id: params.productId
            },
        });
    
        return NextResponse.json({
            result,
            success: 'Product deleted'
        });
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
};