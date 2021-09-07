import {
  EmailNotification,
  EmailNotificationGateway
} from '../../domain/gateways/EmailNotification';
import { EmailMailer } from '../../infrastructure/mailer';

export function createEmailNotificationGateway({
  mailer
}: {
  mailer: EmailMailer;
}): EmailNotificationGateway {
  return {
    async send(notification: EmailNotification) {
      await mailer.send(notification);
    }
  };
}
