import nodemailer from 'nodemailer';
import {host, port, user, pass} from './mail.json';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transport = nodemailer.createTransport({
  host,
  port,
  auth: {user, pass }
} as SMTPTransport.Options);

export default transport;