import { createHash } from '../../infrastructure/createHash';
import { uuid } from '../../infrastructure/uuid';

// TODO: find out why we cannot extend `Error` class
export class UserNotFoundError {
  constructor(public message: string) {}
}

export async function sendLoginLink(
  userData: {
    email: string;
  },
  { userStore }
): Promise<void> {
  const { email } = userData;
  const userId = createHash(email);

  if (!userStore.exists(userId)) {
    throw new UserNotFoundError(
      `Cannot create link for non-existing email: ${email}`
    );
  }

  const user = userStore.get(userId);

  const userWithLoginToken = {
    ...user,
    loginToken: uuid()
  };

  // TODO: Construct a link with login_token and send via email
  console.log({ userWithLoginToken });

  userStore.set(userWithLoginToken);
}
