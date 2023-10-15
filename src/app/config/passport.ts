import { prisma } from '@/lib/db/prisma';
import passport from 'passport';

import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

interface User {
    id: string;
    email: string;
    password: string;
}

passport.serializeUser((user: any, done) => {(user: User, cb:any) => {
    cb(null, user.id)
}})

passport.deserializeUser(async (id: string, cb) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    cb(null, user?.id);
  } catch (error) {
    cb(error);
  }
});


passport.use(
  new LocalStrategy(async (email, password, cb) => {
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!existingUser || !existingUser.password) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!passwordMatch) {
        return cb(null, false, { message: 'Incorrect password.' });
      }

      const user = {
        ...existingUser,
        password: undefined,
      };
      return cb(null, user);
    } catch (error) {
      cb(error);
    }
  })
);
