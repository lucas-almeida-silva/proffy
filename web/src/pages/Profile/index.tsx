import React, { useState, useEffect, FormEvent } from 'react';
import { toast } from 'react-toastify';

import TopBarHeader from '../../components/TopBarHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import { useAuth } from '../../contexts/auth';

import api from '../../services/api';

import avatarDefaultImg from '../../assets/images/avatar-default.png';
import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import Loader from '../../components/Loader';

function Profile() {
  const { user } = useAuth();

  const [loader, setLoader] = useState(false);

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: ''}
  ]);

  useEffect(() => {
    api.get(`users/${user?.id}`)
      .then(response => {
        setFirstName(response.data.first_name)
        setLastName(response.data.last_name)
        setEmail(response.data.email)
        setWhatsapp(response.data.whatsapp)
        setBio(response.data.bio)
        setSubject(response.data.subject)
        setCost(response.data.cost);
        setScheduleItems(response.data.schedule);
      }).catch(() => {
        toast.error('Ocorreu um erro ao buscar os dados do proffy');
      });
  }, []);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ]);
  }

  function handleRemoveScheduleItem(index: number) {
    const newArray = [...scheduleItems];
    newArray.splice(index, 1);
    setScheduleItems(newArray);
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(index === position) {
        return { ...scheduleItem,  [field]: value }
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  async function handleUpdateProffyProfile(e: FormEvent) {
    e.preventDefault();

    setLoader(true);

    try {
      await api.put('users', {
        id: user?.id,
        first_name,
        last_name,
        email,
        avatar,
        bio,
        whatsapp,
        subject,
        cost,
        schedule: scheduleItems
      });

      toast.success('Perfil atualizado com sucesso!');
    } catch(err) {
      toast.error('Ocorreu um erro ao salvar os dados');
    }
    finally {
      setLoader(false);
    }
  }

  return (
    <div id="page-profile" className="container">  
      {loader && <Loader /> }

      <header>   
        <TopBarHeader title="Meu perfil"/>
        <div className="user-identity">
          <img src={avatar || avatarDefaultImg} alt="Avatar usuário"/>
          <strong>{`${user?.first_name} ${user?.last_name}`}</strong>
          <span>{subject}</span>
        </div>  
      </header>

      <main>
        <form onSubmit={handleUpdateProffyProfile}>
          <fieldset>
            <legend>Seus dados</legend>

              <div className="proffy-name">
                <Input 
                  name="first_name" 
                  label="Nome" 
                  value={first_name} 
                  onChange={(e) => { setFirstName(e.target.value) }}
                />
                <Input 
                  name="last_name" 
                  label="Sobrenome" 
                  value={last_name} 
                  onChange={(e) => { setLastName(e.target.value) }}
                />
              </div>
              
              <div className="proffy-contact">
                <Input 
                  name="email" 
                  label="Email" 
                  value={email} 
                  onChange={(e) => { setEmail(e.target.value) }}
                />
                <Input 
                  name="whatsapp"
                  label="Whatsapp"
                  value={whatsapp} 
                  onChange={(e) => { setWhatsapp(e.target.value) }} 
                />
              </div>

              <Input 
                  name="avatar"
                  label="Avatar"
                  value={avatar} 
                  onChange={(e) => { setAvatar(e.target.value) }} 
              />
              
              <TextArea 
                name="bio" 
                label="Biografia"
                maxLength={300}
                observation="(Máximo de 300 caracteres)"
                value={bio} 
                onChange={(e) => { setBio(e.target.value) }}
              />
          </fieldset>

          <fieldset>
          <legend>Sobre a aula</legend>

            <div className="subject-cost">
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

              <Input 
                name="cost" 
                label="Custo da sua hora por aula"
                prefix='R$' 
                value={cost} 
                onChange={(e) => { setCost(e.target.value) }}
              />
            </div>
            
          </fieldset>
          
          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
              + Novo horário
            </button>
            </legend>
            
            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={index} className="schedule-item">
                  <div className="schedule-item-info">
                    <Select 
                      name="week_day" 
                      label="Dia da semana" 
                      value={scheduleItem.week_day}
                      onChange={(e => setScheduleItemValue(index, 'week_day', e.target.value)) }
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
                      name="from" 
                      label="Das" 
                      type="time"
                      value={scheduleItem.from}
                      onChange={(e) => { setScheduleItemValue(index, 'from', e.target.value) }} 
                    />
                    <Input 
                      name="to" 
                      label="Às" 
                      type="time" 
                      value={scheduleItem.to}
                      onChange={(e) => { setScheduleItemValue(index, 'to', e.target.value) }} 
                    />
                  </div>
                  
                  <div className="remove-schedule-item">
                    <button 
                      type="button" 
                      onClick={() => handleRemoveScheduleItem(index)}>
                        Excluir Horário
                    </button>
                  </div>
                  
                </div>
              );
            })}
            
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante ! <br />
              Preencha todos os dados
            </p>
            <button type="submit">
              Atualizar perfil
            </button>
          </footer>

        </form>
      </main>
    </div>
  );

}

export default Profile;