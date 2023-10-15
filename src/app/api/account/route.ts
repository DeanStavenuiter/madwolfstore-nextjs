import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcrypt';
import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

interface SignupBody {
  email: string;
  password: string;
}

//create a user
export async function POST(request: Request) {
  const { email, password: passwordRaw }: SignupBody = await request.json();

  console.log('Credentials', email, passwordRaw);

  // check if email and password are provided
  if (!email || !passwordRaw) {
    return Response.json(
      'Email and password are required',
    );
  }

  try {
    //check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email.toLocaleLowerCase(),
      },
    });

    if (existingUser) {
      return NextResponse.json({
        message: 'Email already exists',
        status: 400,
      });
    }

    //encrypt the password
    const passwordHash = await bcrypt.hash(passwordRaw, 10);

    const result = await prisma.user.create({
      data: {
        email: email.toLocaleLowerCase(),
        password: passwordHash,
      },
    });

    //we remove the password from the result
    const newUser = {
      ...result,
      password: undefined,
    };

    return NextResponse.json({
      message: 'User created',
      user: newUser,
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({
        message: 'This email already exists',
        error,
      });
    }
    return NextResponse.json({
      message: 'Something went wrong',
      error,
    });
  }
}

// //get a user
// export const GET = async (req: NextApiRequest, res: NextApiResponse) => {};

// //update a user
// export const PUT = async (req: NextApiRequest, res: NextApiResponse) => {};

// //delete a user
// export const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {};
