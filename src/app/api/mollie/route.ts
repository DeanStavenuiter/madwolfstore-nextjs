import { getUser } from '@/app/User/user';
import { prisma } from '@/lib/db/prisma';
import { env } from '@/lib/env';
import { MethodInclude, createMollieClient } from '@mollie/api-client';
import { NextResponse } from 'next/server';

interface IssuerMethodResponse {
  issuers: Issuer[];
}

interface Issuer {
  resource: string;
  id: string;
  name: string;
  image: {
    size1x: string;
    size2x: string;
    svg: string;
  };
}

// generate order number
const generateOrderNumber = async (): Promise<string> => {
  const latestOrder = await prisma.order.findFirst({
    orderBy: { orderNo: 'desc' },
  });

  const lastOrderNo = latestOrder ? parseInt(latestOrder.orderNo, 10) : 0;
  const nextOrderNo = (lastOrderNo + 1).toString().padStart(6, '0');

  return nextOrderNo;
};

export async function POST(request: Request) {
  const response = await request.json();
  const userSession = await getUser();

  console.log('UserSession in Mollie route', userSession);

  const { subtotal, method, formData } = response;

  if (!subtotal.totalPrice || !method || !formData) {
    return NextResponse.json(
      {
        message: 'Missing required fields',
      },
      { status: 400 }
    );
  }

  if (subtotal.totalPrice !== undefined || subtotal.totalPrice !== null) {
    let totalString = subtotal.totalPrice.toString().replace('.', '');

    // console.log('totalString', totalString);

    const price = totalString.slice(0, -2) + '.' + totalString.slice(-2);

    // console.log('price', price);

    const mollieClient = createMollieClient({
      apiKey: `${env.MOLLIE_API_KEY}`,
    });

    try {
      const orderNumber = await generateOrderNumber();

      if (userSession) {
        const cartItems = userSession.Cart.flatMap((cart) =>
          cart.items.map(
            (item: any) => (
              console.log('item in cartItems', item.id),
              {
                id: item.id,
                // productId: item.product.id,
                // quantiy: item.quantity,
                // orderId: orderNumber || null,
              }
            )
          )
        );
        try {
          // create order in db with cart items and order number
          const createOrder = await prisma.order.create({
            data: {
              orderNo: orderNumber,
              items: {
                connect: cartItems,
              },
              user: {
                connect: {
                  id: userSession.id,
                },
              },
            },
            include: {
              items: {
                include: {
                  product: true,
                },
              },
            },
          });

          console.log('order in db: ', createOrder);
        } catch (error) {
          console.log(error);
          return NextResponse.json({
            message: 'Error creating order',
            status: 500,
            error: error,
          });
        }
      }

      // console.log('order in db: ', createOrder.items[0].product);

      //create payment in mollie api with details
      const paymentDetails = {
        method: method,
        amount: {
          value: price,
          currency: 'EUR',
        },
        description: 'MadWolf Store',
        redirectUrl: 'http://localhost:3000/checkout/success',
        cancelUrl: 'http://localhost:3000/checkout',
        webhookUrl:
          ' https://47b7-2a02-a46e-7f9e-0-a9a7-fa40-a88b-74af.ngrok-free.app/api/webhook',
        metadata: {
          user_id: userSession?.id,
          order_id: orderNumber,
          cart_id: userSession?.Cart[0].id,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city}, ${formData.country}`,
        },
      };

      const payment = await mollieClient.payments.create(paymentDetails);

      // console.log('Payment in mollie api POST', payment);

      return NextResponse.json({
        message: 'Payment created',
        status: 201,
        payment: payment,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        message: 'Error creating payment',
        status: 500,
        error: error,
      });
    }
  } else {
    console.log('Subtotal is null or undefined');
    return NextResponse.json(
      {
        message: 'Error creating payment',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const mollieClient = createMollieClient({
    apiKey: `${env.MOLLIE_API_KEY}`,
  });

  try {
    // get a list of all available payment methods
    let methods = await mollieClient.methods.list();

    let issuerMethods = (await mollieClient.methods.get('ideal', {
      include: ['issuers', 'pricing'] as MethodInclude[],
    })) as object as IssuerMethodResponse;

    return NextResponse.json({
      message: 'Payment methods list',
      status: 201,
      methods: methods,
      issuers: issuerMethods.issuers,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Error retrieving methods list',
      },
      { status: 500 }
    );
  }
}
