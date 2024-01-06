// import { prisma } from '@/lib/db/prisma';
// import { NextResponse } from 'next/server';

// export async function GET(request :any ) {
//   const id  = request.nextUrl.searchParams.get('id') ;

//   // console.log(id + ' id');
//   try {
//     const product = await prisma.product.findUnique({
//       where: { id },
//       include: {
//         sizes: true,
//       },
//     });

//     return NextResponse.json({
//       message: 'Product found',
//       product,
//       status: 200,
//     });
//   } catch (error) {
//     console.log(error);

//     return NextResponse.json({
//       message: 'Product not found',
//       error,
//       status: 500,
//     });
//   }
// }
