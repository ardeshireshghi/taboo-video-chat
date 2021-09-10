import { DefaultUser, User } from '../../domain/User';

import { createHash } from '../../infrastructure/createHash';
import { createJWTToken } from '../../infrastructure/createJWTToken';
import { Services } from '../../infrastructure/service-locator';

export async function registerUser(
  userData: {
    email: string;
    name: string;
  },
  { userStore }: Pick<Services, 'userStore'>
): Promise<User | undefined> {
  const { email, name } = userData;
  const userId = createHash(email);

  if (await userStore.exists(userId)) {
    return;
  }

  const accessToken = createJWTToken({
    id: userId,
    email,
    name
  });

  await userStore.set(userId, {
    id: userId,
    name,
    email
  });

  return new DefaultUser(userId, name, email, accessToken);
}
