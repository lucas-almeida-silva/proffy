import React, { useState, useEffect, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import TopBarHeader from '../../components/TopBarHeader';
import Input from '../../components/Input';
import MaskedInput from '../../components/MaskedInput';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import FormFooter from '../../components/FormFooter';
import Loader from '../../components/Loader';

import { useAuth } from '../../contexts/auth';

import api from '../../services/api';
import ROLES from '../../utils/constants/roles';

import avatarDefaultImg from '../../assets/images/avatar-default.png';

import './styles.css';

function Profile() {
  const { user, updateUserInfo } = useAuth();

  const [loader, setLoader] = useState(false);
  const history = useHistory();

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: ''}
  ]);

  useEffect(() => {
    async function getProfileInfo() {     
      setLoader(true);
      const url = user?.role === ROLES.student ? `users/${user?.id}` : `teachers/${user?.id}`

      try {
        const { data } = await api.get(url);
  
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setEmail(data.email);
        setAvatar(data.avatar);

        if(user?.role === ROLES.teacher) {
          setWhatsapp(data.whatsapp);
          setBio(data.bio);
          setSubject(data.subject)
          setCost(data.cost)
          setScheduleItems(data.schedule);
        }           
      } catch(err) {
        toast.error('Ocorreu um erro ao buscar os dados do proffy');
      }
      finally {
        setLoader(false);      
      }      
    }

    getProfileInfo();  
  }, [user]);

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

  async function handleUpdateProfile(e: FormEvent) {
    e.preventDefault();

    setLoader(true);

    const url = user?.role === ROLES.student ? `users` : 'teachers'
    let body: any = {
      id: user?.id,
      first_name,
      last_name,
      email,
      avatar
    }

    if(user?.role === ROLES.teacher) {
      body = {
        ...body,
        bio,
        whatsapp: whatsapp.replace(/[^0-9]+/g,''),
        subject,
        cost,
        schedule: scheduleItems
      }
    }
    
    try {
      await api.put(url, body);
      updateUserInfo({first_name, last_name, email, avatar});
      toast.success('Perfil atualizado com sucesso!');
      history.goBack()
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
          <img 
            src={(avatar && (avatar.endsWith(".jpg") || avatar.endsWith(".png"))) ? avatar : avatarDefaultImg} 
            alt="Avatar usuário"
          />       
          <strong>{`${user?.first_name} ${user?.last_name}`}</strong>
          {user?.role === ROLES.teacher && <span>{subject}</span>}
        </div>  
      </header>

      <main>
        <form onSubmit={handleUpdateProfile}>
          
          {user?.role === ROLES.student ? (
            <>
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
                  
                  <Input 
                    name="email" 
                    label="Email" 
                    value={email} 
                    onChange={(e) => { setEmail(e.target.value) }}
                  />

                  <Input 
                    name="avatar"
                    label="Avatar"
                    value={avatar} 
                    onChange={(e) => { setAvatar(e.target.value) }} 
                  />
                  
              </fieldset>  
            </>
          ) :
          (
            <>
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
                    <MaskedInput 
                      name="whatsapp"
                      label="Whatsapp"
                      mask="(99) 99999-9999"
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
            </>
          )}
      
          <FormFooter buttonSubmitLabel="Atualizar perfil"/>

        </form>
      </main>
    </div>
  );
}

export default Profile;