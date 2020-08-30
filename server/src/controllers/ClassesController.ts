import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes, { convertMinutesToHours } from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    let query = db('classes')
      .join('teachers', 'classes.teacher_id', '=', 'teachers.id')
      .join('users', 'teachers.user_id', '=', 'users.id');

    if(subject) {
      query = query.where('subject', subject)
    }

    if(week_day) {
      query = query.whereExists(function() {
        this.select("class_schedule.*")
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
      });
    }

    if(time) {
      const timeInMinutes = convertHourToMinutes(time);

      query = query.whereExists(function() {
        this.select("class_schedule.*")
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
    }

    query = query.select(['teachers.id', 'users.first_name', 'users.last_name', 'users.avatar',
     'teachers.bio', 'teachers.whatsapp', 'classes.id as class_id', 'classes.subject', 'classes.cost']);

    const classes = await query;
    
    const classes_schedules = classes.map(async c => {

      const class_schedule = await db('class_schedule')
        .where('class_id', c.class_id)
        .select(['week_day', 'to', 'from'])
        .orderBy("week_day");

      return {
        ...c,
        schedule: class_schedule.map(schedule => {
          return {
            week_day: schedule.week_day,
            from: convertMinutesToHours(schedule.from),
            to: convertMinutesToHours(schedule.to),               
          }
        })
      }                     
    });

    const availableTeachersClasses = await Promise.all(classes_schedules);
   
    return response.status(200).send({teachers: availableTeachersClasses, total: classes.length});
  }
  
  async create(request: Request, response: Response) {
    const {
      user_id,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;
  
    const trx = await db.transaction();
  
    try {
      const insertedTeachersIds = await trx('teachers').insert({
        user_id,
        bio,
        whatsapp
      });

      const teacher_id = insertedTeachersIds[0];
    
      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        teacher_id
      });
    
      const class_id = insertedClassesIds[0];
    
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to)
        }
      });
    
      await trx('class_schedule').insert(classSchedule);
    
      await trx.commit();
    
      return response.status(201).send();
    } catch(err) {
      trx.rollback();
      return response.status(400).send({
        error: 'Unespected error while creating new class'
      })
    }
  }
}