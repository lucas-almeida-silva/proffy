import { Request, Response } from 'express';
import db from '../database/connection';
import bcrypt from 'bcrypt';
import convertHourToMinutes, {convertMinutesToHours} from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string
}


export default class UsersController {
  async getById(request: Request, response: Response) {
    const id = request.params.id;

    try {
      const teacher = await db('users')
        .join('teachers', 'users.id', '=', 'teachers.user_id')
        .join('classes', 'classes.teacher_id', '=', 'teachers.id')
        .join('class_schedule', 'class_schedule.class_id', 'classes.id')
        .where('users.id', '=', id)
        .select(['users.first_name', 'users.last_name', 'users.email',
          'teachers.bio', 'teachers.whatsapp', 'classes.*', 'class_schedule.*']);

        const schedule = teacher.map(t => {
          return {week_day: t.week_day, from: convertMinutesToHours(t.from), to: convertMinutesToHours(t.to)}
        });
        
        const teacherInfo = { id: teacher[0].id, first_name: teacher[0].first_name, last_name: teacher[0].last_name, 
          email: teacher[0].email, bio: teacher[0].bio, whatsapp: teacher[0].whatsapp, 
          subject: teacher[0].subject, cost: teacher[0].cost, schedule}     

        response.status(200).send(teacherInfo);

    } catch(err) {
      response.status(400).send({error: 'Unespected error while get teacher info'})
    }
  }

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

  async put(request: Request, response: Response) {
    const { 
      id,
      first_name,
      last_name,
      email,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
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

      const teacher = await trx('teachers').where('user_id', id);
      const teacher_id = teacher[0].id;

      await trx('teachers').where('id', teacher_id).update({
        whatsapp,
        bio
      });

      const classes = await trx('classes').where('teacher_id', teacher_id);
      const class_id = classes[0].id;
 
      await trx('classes').where('id', class_id).update({
        subject,
        cost
      });

      const classesSchedules = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to)
        }
      });

      await trx('class_schedule').where('class_id', class_id).delete();
      await trx('class_schedule').insert(classesSchedules);

      await trx.commit();

      return response.status(204).send();

    } catch(err) {
      trx.rollback();
      response.status(400).send({error: 'Unespected error while updating teacher data'});
    }
    
  }
}