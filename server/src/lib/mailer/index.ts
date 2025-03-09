import conf from '@/conf';
import logger from '@/logger';
import {ejsCompiler} from './ejs';
import {createTransport, type SendMailOptions} from 'nodemailer';

// types
export type MailerOptions = SendMailOptions & {
  context?: object;
  template?: string;
};

// create transporter instance
export const mailer = createTransport({
  host: conf.SMTP_HOST,
  port: conf.SMTP_PORT,
  auth: {
    user: conf.SMTP_USER,
    pass: conf.SMTP_PASS,
  },
  from: conf.SMTP_FROM,
});

// compiler middleware
mailer.use('compile', async (mail, callback) => {
  const {template, context} = mail.data as any;
  // if template is not empty, use the template to compile ejs template
  if (template) {
    try {
      mail.data.html = await ejsCompiler(template, context);
    } catch (error) {
      console.error(error);
      return callback(error as Error);
    }
  }
  return callback();
});

/** Send email to person-email id */
export async function sendEmail(sendMailOptions: MailerOptions) {
  const verify = await mailer.verify();
  // check connection configuration
  if (!verify) throw new Error('Failed to connect to mail server');
  // add default from email address
  const options = Object.assign({from: conf.SMTP_FROM}, sendMailOptions);
  // if app is dev so console on print user email
  if (conf.IS_DEV) logger.info(`Sending mail to ${options.to}`);
  // after send mail, return the result
  return await mailer.sendMail(options);
}
