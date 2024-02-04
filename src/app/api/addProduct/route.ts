import { prisma } from '@/lib/db/prisma';
import { Type } from '@prisma/client';

interface formDataBody {
  name: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  mp4File: string;
  webMFile: string;
  imageUrl1: string;
  imageUrl2: string;
  imageUrl3: string;
  imageUrl4: string;
  price: number;
  type: string;
  stock: number;
  sizes: {
    XS: number;
    S: number;
    M: number;
    L: number;
    XL: number;
    XXL: number;
  };
}

export async function POST(request: Request) {
  const {
    name,
    description1,
    description2,
    description3,
    description4,
    mp4File,
    webMFile,
    imageUrl1,
    imageUrl2,
    imageUrl3,
    imageUrl4,
    price,
    type,
    stock,
    sizes: { XS, S, M, L, XL, XXL },
  }: formDataBody = await request.json();

  const newPrice = Number(price);
  const newSizes = {
    XS: Number(XS),
    S: Number(S),
    M: Number(M),
    L: Number(L),
    XL: Number(XL),
    XXL: Number(XXL),
  }

  
  //create new product
  try {
    await prisma.product.create({
      data: {
        name,
        description1,
        description2,
        description3,
        description4,
        imageUrl1,
        imageUrl2,
        imageUrl3,
        imageUrl4,
        price: newPrice,
        type: type as Type,
        sizes: {
          createMany: {
            data: [
              { size: 'XS', quantity: newSizes.XS },
              { size: 'S', quantity: newSizes.S },
              { size: 'M', quantity: newSizes.M },
              { size: 'L', quantity: newSizes.L },
              { size: 'XL', quantity: newSizes.XL },
              { size: 'XXL', quantity: newSizes.XXL },
            ],
          },
        },
        stock,
        webMFile,
        mp4File,
      },
      include: {
        sizes: true,
      },
    });
  } catch (error) {
    // console.error(error);
    return Response.json({
      message: 'Error creating product',
      status: 400,
    });
  }

  return Response.json({
    message: 'Product created!',
    status: 200,
  });
}
