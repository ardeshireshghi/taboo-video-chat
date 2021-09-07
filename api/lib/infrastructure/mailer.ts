import axios, { AxiosRequestConfig } from 'axios';
import { EmailNotification } from '../domain/gateways/EmailNotification';
import getConfig from './config';

interface Mailer {
  send(notification: any): Promise<void>;
}

interface NotificationPersonDTO {
  email: string;
  name: string;
}

interface NotificationContentDTO {
  type: 'html' | 'text';
  value: string;
}

interface NotificationDTO {
  from: NotificationPersonDTO;
  subject: string;
  content: NotificationContentDTO[];
  personalizations: { to: NotificationPersonDTO[] }[];
}

function domainToDTO(notification: EmailNotification): NotificationDTO {
  return {
    from: notification.from,
    subject: notification.subject,
    content: [
      {
        type: 'html',
        value: notification.content
      }
    ],
    personalizations: [{ to: [notification.to] }]
  };
}

function createEmailApiRequestParams(
  data: NotificationDTO
): AxiosRequestConfig {
  return {
    method: 'post',
    data,
    url: 'https://emailapi.netcorecloud.net/v5/mail/send',
    headers: {
      api_key: getConfig().mailerApiKey,
      'content-type': 'application/json'
    }
  };
}
async function sendEmail(notificationDTO: NotificationDTO) {
  await axios(createEmailApiRequestParams(notificationDTO));
}

export class EmailMailer implements Mailer {
  async send(notification: EmailNotification) {
    await sendEmail(domainToDTO(notification));
  }
}
