import { Request, Response } from 'express';
import db from '../database/connection';
import bcrypt from 'bcrypt';

export default class UsersController {
  async create(request: Request, response: Response) {
    const {
      first_name,
      last_name,
      email,
      password
    } = request.body;

    try {
      const registeredEmail = await db('users').where('users.email', email).select("users.email");

      if(registeredEmail.length) {
        return response.status(400).send({
          error: 'Email already in use'
        });
      }

      const passwordHash = await bcrypt.hash(password, 8);

      await db('users').insert({
        first_name,
        last_name,
        email,
        password: passwordHash
      });

      response.status(201).send();

    } catch(err) {
      return response.status(400).send({
        error: 'Unespected error while creating new users'
      });
    }
  }
}