import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import db from '../database/connection';
import generateToken from '../services/jwt';
import mailer from '../config/mailer';

export default class AuthController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const user = await db('users').where('users.email', email);

      if(!user.length) {
        return response.status(400).send({error: 'User not found'});
      }

      if(!(await bcrypt.compare(password, user[0].password))) {
        return response.status(400).send({error: 'Invalid password'});
      }

      const token = generateToken({id: user[0].id});
      
      const userInfo = {
        id: user[0].id,
        first_name: user[0].first_name,
        last_name: user[0].last_name,
        email: user[0].email,
        avatar: user[0].avatar
      }
      return response.status(200).send({
        token,
        userInfo
      });
    } catch(err) {
      return response.status(400).send({error: 'Unespected error while authentication'});
    }
  }

  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body;

    try {
      const user = await db('users').where('users.email', email);

      if(!user.length) {
        return response.status(400).send({error: 'User not found'});
      }

      const passwordResetToken = crypto.randomBytes(20).toString('hex');
      
      const passwordResetExpires = new Date();
      passwordResetExpires.setHours(passwordResetExpires.getHours()+1);

      const userId = user[0].id;

      await db('users').where("id", userId).update({
        passwordResetToken,
        passwordResetExpires
      });

      mailer.sendMail({
        to: email,
        from: 'noreply@proffy.com.br',
        subject: 'Recuperação de senha - Proffy',
        html: `<p>Você esqueceu sua senha? Não se preocupe, 
              clique <a href="http://localhost:3000/reset-password/${passwordResetToken}">aqui</a>
              para criar uma nova senha.</p>`
      }, (err) => {
        if(err) {
          return response.status(400).send({error: 'Cannot send forgot password email'});
        }
      });

      return response.status(200).send({message: 'Email successfully sent'})

    } catch(err) {
      return response.status(400).send({error: 'Error on forgot password, try again'});
    }
  }

  async resetPassword(request: Request, response: Response) {
    const { token, password } = request.body;

    try {
      const user = await db('users').where('passwordResetToken', token);

      if(!user.length) {
        return response.status(400).send({error: 'Token invalid'});
      }

      const now = new Date();

      if(now > user[0].passwordResetExpires) {
        return response.status(400).send({error: 'Token expired, please generate a new one'});
      }

      const passwordHash = await bcrypt.hash(password, 8);

      const userId = user[0].id;

      await db('users').where("id", userId).update({
        password: passwordHash,
        passwordResetToken: null,
        passwordResetExpires: null
      });

      return response.status(200).send();

    } catch(err) {
      return response.status(400).send({error: 'Cannot reset password, try again'});
    }
  }
}