import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Loader from '../../components/Loader';

import { toast } from 'react-toastify';

import api from '../../services/api';

import happyProffyEmoji from '../../assets/images/icons/emoji-happy-proffy.svg';

import './styles.css';

function TeacherList() {
  const [loader, setLoader] = useState(false);

  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function searchTeachers(e: FormEvent) {
    e.preventDefault();
    setLoader(true);

    setTimeout(async () => {
      try {
        const response = await api.get('classes', {
          params: {
            subject,
            week_day,
            time
          }
        });

        setTeachers(response.data);
      } catch(err) {
        toast.error('Não foi possível realizar a busca');
      } finally {
        setLoader(false);
      }
    }, 300); 
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader 
        topBarTitle='Estudar' 
        title='Estes são os proffys disponíveis.'
        additionalDescription={{icon: happyProffyEmoji, text:'Nós temos 32 professores'}}>
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select 
            name="subject" 
            label="Matéria" 
            value={subject}
            onChange={(e) => { setSubject(e.target.value) }}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação física', label: 'Educação física' },
              { value: 'Filosofia', label: 'Filosofia' },
              { value: 'Física', label: 'Física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'História', label: 'História' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Português' },
              { value: 'Química', label: 'Química' },
            ]}
          />
          <Select 
            name="week_day" 
            label="Dia da semana" 
            value={week_day}
            onChange={(e) => { setWeekDay(e.target.value) }}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input 
            type="time" 
            name="time" 
            label="Hora"
            value={time}
            onChange={(e) => { 
              setTime(e.target.value) 
            }} 
          />

          <button type="submit">
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}
      </main>

      {loader && <Loader /> }
    </div>
  )
}

export default TeacherList;