import { prisma } from '@/lib/db/prisma';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  console.log('Webhook received');

  try {
    // Parse the URL-encoded data using URLSearchParams
    const rawData = await req.text();
    const formData = new URLSearchParams(rawData);

    // Retrieve the necessary data
    const paymentStatus = formData.get('status');
    const paymentId = formData.get('id');

    const response = await axios.get(
      `https://api.mollie.com/v2/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MOLLIE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // console.log('Paymentstatus in webhook api', paymentStatus);
    // console.log('PaymentId in webhook api', paymentId);
    // console.log(`Payment status is ${response.data.status}`);

    if (response.data.status === 'paid') {
      // console.log(`Payment status is ${response.data.status}`);
      // Payment was successful
      // console.log(`Payment ${paymentId} has been paid.`);
      // console.log('Response in webhook api', response.data.metadata);

      // update order status to paid
      const updateOrderStatus = await prisma.order.update({
        where: {
          orderNo: response.data.metadata.order_id, // Provide the actual order ID
        },
        data: {
          status: 'paid',
        },
      });
      // console.log('updateOrderStatus', updateOrderStatus);

      if (updateOrderStatus) {
        //update cart status to paid
        const updateCartStatus = await prisma.cart.update({
          where: {
            id: response.data.metadata.cart_id,
          },
          data: {
            status: 'paid',
          },
        });

        if (updateCartStatus) {
          // delete all cart items
          const deleteCartItems = await prisma.cartItems.deleteMany({
            where: {
              cartId: response.data.metadata.cart_id,
            },
          });

          //delete cart itself
          const deletePaidCart = await prisma.cart.delete({
            where: {
              id: response.data.metadata.cart_id,
            },
          });

          console.log('deletePaidCart', deletePaidCart);
        }
      }
      return NextResponse.json({
        message: 'Payment was successful, order is paid and cart is deleted',
        status: 200,
      });
    }

    if (response.data.status === 'failed') {
      // console.log(`Payment status is ${response.data.status}`);
      // console.log(`Payment ${paymentId} has failed.`);

      // update order status to failed
      const updateOrderStatus = await prisma.order.update({
        where: {
          orderNo: response.data.metadata.order_id, // Provide the actual order ID
        },
        data: {
          status: 'failed',
        },
      });
      return NextResponse.json({
        message: 'Payment failed, please try again',
        status: 400,
      });
    }

    if (response.data.status === 'canceled') {
      // Payment failed
      console.log(`Payment ${paymentId} has been canceled.`);

      // update order status to canceled
      const updateOrderStatus = await prisma.order.update({
        where: {
          orderNo: response.data.metadata.order_id, // Provide the actual order ID
        },
        data: {
          status: 'canceled',
        },
      });
      return NextResponse.json({
        message: 'Payment canceled',
        status: 400,
      });
    }

    if (response.data.status === 'expired') {
      console.log(`Payment ${paymentId} has expired.`);

      // update order status to expired
      const updateOrderStatus = await prisma.order.update({
        where: {
          orderNo: response.data.metadata.order_id, // Provide the actual order ID
        },
        data: {
          status: 'expired',
        },
      });
      return NextResponse.json({
        message: 'Payment expired',
        status: 400,
      });
    }

    if (response.data.status === 'pending') {
      console.log(`Payment ${paymentId} is pending.`);

      // update order status to pending
      const updateOrderStatus = await prisma.order.update({
        where: {
          orderNo: response.data.metadata.order_id, // Provide the actual order ID
        },
        data: {
          status: 'pending',
        },
      });
      return NextResponse.json({
        message: 'Payment is pending',
        status: 400,
      });
    }

    if (response.data.status === 'open') {
      console.log(`Payment ${paymentId} is open.`);

      // update order status to open
      const updateOrderStatus = await prisma.order.update({
        where: {
          orderNo: response.data.metadata.order_id, // Provide the actual order ID
        },
        data: {
          status: 'open',
        },
      });
      return NextResponse.json({
        message: 'Payment is open',
        status: 400,
      });
    }

    console.log(response.data);

  } catch (error) {
    console.error('Error ', error);
    return NextResponse.json(
      {
        message: 'Error processing Mollie webhook',
      },
      { status: 500 }
    );
  }
}
