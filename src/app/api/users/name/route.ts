import { getUser } from '@/app/User/user';

export async function GET() {
  const user = await getUser();

  if (user) {
    if (user.role === 'USER') {
      return Response.json(false, {
        status: 200,
      });
    } else {
      return Response.json(true, {
        status: 200,
      });
    }
  } else {
    return Response.json(false);
  }
}
