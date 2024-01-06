import { getUser } from '@/app/User/user';
import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

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
    return Response.json('Email and password are required');
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
        phone: '',
        Address: {
          create: {
            street: '',
            houseNumber: '',
            postCode: '',
            city: '',
            country: '',
          },
        } as any,
      } as any,
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

// get a user
export const GET = async () => {
  try {
    const user = await getUser();

    if (user) {
      console.log('user in account get', user.email);

      return NextResponse.json({
        message: 'User found',
        user_id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        city: user.Address[0].city,
        country: user.Address[0].country,
        postCode: user.Address[0].postCode,
        street: user.Address[0].street,
        houseNumber: user.Address[0].houseNumber,
        status: 200,
      });
    }
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      message: 'Something went wrong',
      error,
      status: 500,
    });
  }
};

// //update a user
export const PUT = async (request: Request) => {
  const user = await getUser();
  const { formData } = await request.json();

  // console.log('userFromSession', user);
  // console.log('formData', formData);

  // Function to parse the address and separate house number and street
  const parseAddress = (address: string) => {
    // Use a regular expression to match the house number and street
    const match = address.match(/(\D*)(\d+[\da-zA-Z]*)(\D*)/);

    if (match) {
      // Extract house number and street from the regex match
      const streetPrefix = match[1];
      const houseNumberWithSuffix = match[2];
      const streetSuffix = match[3];

      // Separate the house number and suffix
      const houseNumber = houseNumberWithSuffix.replace(/\D/g, '');
      const suffix = houseNumberWithSuffix.replace(/\d/g, '');

      // Concatenate the non-digit parts to form the street
      const street = `${streetPrefix}${streetSuffix}`;

      return { houseNumber, street, suffix };
    } else {
      // If no match is found, return a default value
      return { houseNumber: null, street: address, suffix: null };
    }
  };

  const { street, houseNumber, suffix } = parseAddress(formData.address);

  // console.log('street', street, 'houseNumber', houseNumber, 'suffix', suffix);

  if (user && !user.Address[0]) {
    try {
      //update firstname and lastname
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
      });

      // create a new address
      const newAddress = await prisma.address.create({
        data: {
          street: street,
          houseNumber: `${houseNumber}${suffix}`,
          city: formData.city,
          postCode: formData.postCode,
          country: formData.country,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      // console.log('newAddress', newAddress);

      return NextResponse.json({
        message: 'Address created',
        status: 201,
      });
    } catch (error) {
      console.log('error', error);
      return NextResponse.json({
        message: 'Something went wrong',
        error: error,
        status: 500,
      });
    }
  } else {
    if (user && user.Address[0]) {

      //update firstname and lastname
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
      });

      try {
        // update the address
        const updatedAddress = await prisma.address.update({
          where: {
            id: user.Address[0].id,
          },
          data: {
            street: street,
            houseNumber: `${houseNumber}${suffix}`,
            postCode: formData.postCode,
            city: formData.city,
            country: formData.country,
          },
        });

        // console.log('updatedAddress', updatedAddress);

        return NextResponse.json({
          message: 'Address updated',
          status: 201,
        });
      } catch (error) {
        console.log('error', error);
        return NextResponse.json({
          message: 'Something went wrong',
          error: error,
          status: 500,
        });
      }
    }
  }
};

// //delete a user
// export const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {};
