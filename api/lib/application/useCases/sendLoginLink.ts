import { EmailNotification } from '../../domain/gateways/EmailNotification';
import getConfig from '../../infrastructure/config';
import { createHash } from '../../infrastructure/createHash';
import { Services } from '../../infrastructure/service-locator';
import { uuid } from '../../infrastructure/uuid';

// TODO: find out why we cannot extend `Error` class
export class UserNotFoundError {
  constructor(public message: string) {}
}

function createLoginLinkNotification(user: any): EmailNotification {
  const linkUrl = new URL(`http://${getConfig().webAppUrl}/api/v1/login`);
  linkUrl.searchParams.set('email', user.email);
  linkUrl.searchParams.set('loginToken', user.loginToken);

  return {
    from: { email: 'ardieshghi@pepisandbox.com', name: 'ardieshghi' },
    subject: 'Taboo Login link',
    content: `Hello ${user.name}, Please click on the link below to login: 
        ${linkUrl.toString()}
        `,
    to: { email: user.email, name: user.name }
  };
}

export async function sendLoginLink(
  userData: {
    email: string;
  },
  {
    userStore,
    emailNotification
  }: Pick<Services, 'emailNotification' | 'userStore'>
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

  await emailNotification.send(createLoginLinkNotification(userWithLoginToken));

  userStore.set(userId, userWithLoginToken);
}
