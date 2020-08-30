import { Request, Response } from 'express';
import db from '../database/connection';

export default class StudentsController {
  async getProfile(request: Request, response: Response) {
    const id = request.params.id;

    try {
      const user = await db('users')
        .where('users.id', '=', id)
        .select(['users.first_name', 'users.last_name', 'users.email', 'users.avatar']);
    
      return response.status(200).send(user);

    } catch(err) {
      return response.status(400).send({error: 'Unespected error while get user info'})
    }
  }

  async update(request: Request, response: Response) {
    const { 
      id,
      first_name,
      last_name,
      email,
      avatar
    } = request.body;

    const trx = await db.transaction();

    try {

      const userExists = (await trx('users').where('id', id)).length;

      if(!userExists) {
        return response.status(400).send({error: 'User not found'});
      }

      const emailExists = (await trx('users').where('email', email).whereNot('id', id)).length;

      if (emailExists) {
        return response.status(400).send({error: 'Email alredy in use'});
      }

      await trx('users').where('id', id).update({
        first_name,
        last_name,
        email,
        avatar
      });

      await trx.commit();

      return response.status(204).send();

    } catch(err) {
      trx.rollback();
      return response.status(400).send({error: 'Unespected error while updating user data'});
    }
    
  }
}