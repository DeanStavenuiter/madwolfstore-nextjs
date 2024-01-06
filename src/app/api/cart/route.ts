import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function PUT(request :any ) {
    const productId  = request.nextUrl.searchParams.get('productId') ;  
    const selectedSize = request.nextUrl.searchParams.get('selectedSize') ;

    console.log(productId + ' productId');
    console.log(selectedSize + ' selectedSize');
    
    try {
      const product = await prisma.cartItems.update({
        where: { id: productId },
        data: {
          size: selectedSize,
          sizeQuantity: { increment: 1},
        },
      });
  
      return NextResponse.json({
        message: 'Product size and quantity updated',
        product,
        status: 200,
      });
    } catch (error) {
      console.log(error);
  
      return NextResponse.json({
        message: 'Product not found',
        error,
        status: 500,
      });
    }
}