import { DefaultUser, User } from '../../domain/User';
import { createHash } from '../../infrastructure/createHash';
import { createJWTToken } from '../../infrastructure/createJWTToken';

export async function verifyLoginToken(
  params: {
    email: string;
    token: string;
  },
  { userStore }
): Promise<User | undefined> {
  const { email, token } = params;
  const userId = createHash(email);

  if (!userStore.exists(userId)) {
    console.log(`verifyLoginToken - user with email ${email} does not exist`);
    return;
  }

  const user = userStore.get(userId);

  if (!user.loginToken || token !== user.loginToken) {
    console.log(
      `verifyLoginToken - user does not have login token or token does not match`
    );
    return;
  } else {
    const accessToken = createJWTToken({
      id: userId,
      email: user.email,
      name: user.name
    });

    userStore.set(userId, {
      ...user,
      loginToken: null
    });

    return new DefaultUser(userId, user.name, user.email, accessToken);
  }
}
