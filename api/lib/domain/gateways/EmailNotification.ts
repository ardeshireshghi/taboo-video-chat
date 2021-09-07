import { send } from 'process';

type NotificationEntity = {
  email: string;
  name: string;
};

export interface EmailNotification {
  from: NotificationEntity;
  subject: string;
  content: string;
  to: NotificationEntity;
}

export interface EmailNotificationGateway {
  send(notification: EmailNotification): Promise<void>;
}
