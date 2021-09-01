import { DefaultUser, User } from '../../domain/User';

import { createHash } from '../../infrastructure/createHash';
import { createJWTToken } from '../../infrastructure/createJWTToken';

export async function registerUser(
  userData: {
    email: string;
    name: string;
  },
  { userStore }
): Promise<User | undefined> {
  const { email, name } = userData;
  const userId = createHash(email);

  if (userStore.exists(userId)) {
    return;
  }

  const accessToken = createJWTToken({
    id: userId,
    email,
    name
  });

  userStore.set(userId, {
    name,
    email
  });

  return new DefaultUser(userId, name, email, accessToken);
}
