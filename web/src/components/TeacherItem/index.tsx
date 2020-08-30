import React from 'react';

import api from '../../services/api';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import avatarDefaultImg from '../../assets/images/avatar-default.png';

import './styles.css';

export interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  bio: string;
  cost: number;
  subject: string;
  whatsapp: string;
  schedule: ScheduleProps[];
}

export interface ScheduleProps {
  week_day: number;
  from: string;
  to: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const week_days = [
    {key: 0, value: 'Domingo'},
    {key: 1, value: 'Segunda'},
    {key: 2, value: 'Terça'},
    {key: 3, value: 'Quarta'},
    {key: 4, value: 'Quinta'},
    {key: 5, value: 'Sexta'},
    {key: 6, value: 'Sábado'}
  ];

  
function showTime(week_day: number) {
  const schedule = teacher.schedule[teacher.schedule.findIndex(schedule => schedule.week_day === week_day)];
  const [hoursFrom, minutesFrom] = schedule.from.split(':');
  const [hoursTo, minutesTo] = schedule.to.split(':');

  const from = `${hoursFrom}h${Number(minutesFrom) > 0 ? minutesFrom : ""}`;
  const to = `${hoursTo}h${Number(minutesTo) > 0 ? minutesTo : ""}`;

  return `${from} - ${to}`
}


  function createNewConnection() {
    api.post('connections', {
      user_id: teacher.id
    });
  }
  
  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar || avatarDefaultImg} alt={teacher.first_name + teacher.last_name}></img>
        <div>
          <strong>{`${teacher.first_name} ${teacher.last_name}`}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <div className="schedule">
        {teacher.schedule.map(schedule => (
          <div className="schedule-item" key={schedule.week_day}>
            <div className="week-day">
              <p>Dia</p>
              <strong>{week_days.find(day => day.key === schedule.week_day)?.value}</strong>
            </div>

            <div className="time">
              <p>Horário</p>
              <strong>
                {showTime(schedule.week_day)}
              </strong>
            </div>
          </div>
        ))}

      </div>

      <footer>
        <p>
          Preço/hora
          <strong>{teacher.cost}</strong>
        </p>
        <a 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={createNewConnection} 
          href={`https://wa.me/${teacher.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  )
}

export default TeacherItem;