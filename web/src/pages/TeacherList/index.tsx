import React, { useState, FormEvent, useEffect } from 'react';

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
  const [totalTeachers, setTotalTeachers] = useState(0);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function getTeachersList() {
    setLoader(true);

    try {
      const { data } = await api.get('classes', {
        params: {
          subject,
          week_day,
          time
        }
      });
  
      setTeachers(data.teachers);
      setTotalTeachers(data.total);
    } catch(err) {
      toast.error('Ocorreu um erro ao busca os proffys disponíveis')
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getTeachersList();
  }, []);

  function searchTeachers(e: FormEvent) {
    e.preventDefault();

    getTeachersList();
  }

  return (
    <div id="page-teacher-list" className="container">
      { loader && <Loader /> }
      <PageHeader 
        topBarTitle='Estudar' 
        title='Estes são os proffys disponíveis.'
        additionalDescription={{icon: happyProffyEmoji, text:`Nós temos ${totalTeachers} professores`}}>
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
        {teachers.length ? (
          teachers.map((teacher: Teacher) => {
            return <TeacherItem key={teacher.id} teacher={teacher} />
          })
        ) : 
        (
          <p className="empty-result">Não há professores disponíveis.</p>
        )}
               
      </main>

    </div>
  )
}

export default TeacherList;