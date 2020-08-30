import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinutes, {convertMinutesToHours} from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string
}

export default class TeachersController {
  async index(request: Request, response: Response) {
    const id = request.params.id;

    try {
      const teacher = await db('teachers')
        .join('users', 'users.id', '=', 'teachers.user_id')
        .join('classes', 'classes.teacher_id', '=', 'teachers.id')
        .where('users.id', '=', id)
        .select(['users.first_name', 'users.last_name', 'users.email', 'users.avatar', 'teachers.bio',
          'teachers.whatsapp', 'classes.id as class_id', 'classes.subject', 'classes.cost',]);
      
      if(!teacher.length) {
        return response.status(400).send({error: 'Teacher not found'});
      }

      const class_schedule = await db('class_schedule')
        .where('class_id', '=', teacher[0].class_id)
        .select(['week_day', 'from', 'to'])
        .orderBy("week_day");
              
      delete teacher[0].class_id;

      const schedule = class_schedule.map(class_schedule => {
        return {
          week_day: class_schedule.week_day,
          from: convertMinutesToHours(class_schedule.from),
          to: convertMinutesToHours(class_schedule.to)
        }
      });

      const teacherInfo = { ...teacher[0], schedule};

      return response.status(200).send(teacherInfo);

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

      const teacherExists = (await trx('teachers').where('user_id', id)).length;

      if(!teacherExists) {
        return response.status(400).send({error: 'The user is not a teacher'});
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
      return response.status(400).send({error: 'Unespected error while updating user data'});
    }
    
  }
}