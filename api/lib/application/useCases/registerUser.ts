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

  // We don't store the JWT in the storage
  // But we return it as part of the user domain so
  // the client app can use it for signing later requests
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
