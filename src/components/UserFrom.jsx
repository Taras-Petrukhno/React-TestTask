import React from 'react'
import PropTypes from 'prop-types'

// Components
import Button from './Button';
import InputText from './InputText';
import InputFile from './InputFile';
import InputRadio from './InputRadio';

// Style
import '../scss/components/UserFrom.scss';
import { useState } from 'react';


function UserFrom({positions, getUsers}) {

  const [fields, setFields] = useState({
    name: {value: '', validated: false}, 
    email: {value: '', validated: false}, 
    phone: {value: '', validated: false}, 
    position: {value: '', validated: false}, 
    file: {value: '', validated: false},
  });
  const [disabled, setDisabled] = useState(false)


  // Validation functions

  const validateNameInput = (value, errorFn) => {
    if (value.length < 2 || value.length > 60 ) {
      errorFn('User name, should more than 2 characters, and less then 60 ones')
      setFields(prev => ({...prev, name: {value: prev.name.value, validated: false}}))
    } else {
      errorFn(null)
      setFields(prev => ({...prev, name: {value: prev.name.value, validated: true}}))
    }
  }

  const validateEmailInput = (value, errorFn) => {
    const  rfc2822Pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    let isValid = rfc2822Pattern.test(value);
    if (value.length < 2 || value.length > 100) {
      errorFn('Email, should more than 2 characters, and less then 100 ones');
      setFields(prev => ({...prev, email: {value: prev.email.value, validated: false}}))
    } else if (!isValid) {
      errorFn('Email, must be a valid email according to RFC2822');
      setFields(prev => ({...prev, email: {value: prev.email.value, validated: false}}))
    } else {
      errorFn(null);
      setFields(prev => ({...prev, email: {value: prev.email.value, validated: true}}))
    }
  }

  const validatePhoneInput = (value, errorFn, helperTextFn) => {
    const  phonePattern = /^\+?380(\d{9})$/;
    let isValid = phonePattern.test(value);

    if(!isValid) {
      helperTextFn(null);
      errorFn('User phone number, should start with code of Ukraine +380');
      setFields(prev => ({...prev, phone: {value: prev.phone.value, validated: false}}))
    } else {
      errorFn(null);
      helperTextFn('+38 (XXX) XXX - XX - XX');
      setFields(prev => ({...prev, phone: {value: prev.phone.value, validated: true}}))
    }
  }

  const validatePositionInput = (value) => {
   if(!!value) {
    setFields(prev => ({...prev, position: {value: prev.position.value, validated: true}}))
   } else {
    setFields(prev => ({...prev, position: {value: prev.position.value, validated: false}}))
   }
  }

  const validateFileInput = (value, errorFn, screenFn) => {
    errorFn('');
    let file = value[0];
    if (!value.length) {
      errorFn('Nothing has been downloaded');
      screenFn('Upload your photo');
      setFields(prev => ({...prev, file: {value: prev.file.value, validated: false}}));
    } else if(file.size > 5242880) {
      errorFn('Size of image must not exceed 5MB');
      setFields(prev => ({...prev, file: {value: prev.file.value, validated: false}}))
    } else if(!(file.type === 'image/jpeg' || file.type === 'image/jpj')) {
      errorFn('User photo should be jpg/jpeg image');
      setFields(prev => ({...prev, file: {value: prev.file.value, validated: false}}))
    } else if (!FileReader) {
      errorFn('Please, change or update your browser for using this site')
      setFields(prev => ({...prev, file: {value: prev.file.value, validated: false}}))
    } else {

    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
        let image = new Image();
        image.src = reader.result;

        image.onload = function() {
            if(image.naturalWidth < 70 || image.naturalHeight < 70) {
              errorFn('Resolution of image must be at least 70x70px')
              setFields(prev => ({...prev, file: {value: prev.file.value, validated: false}}))
            } else {
              setFields(prev => ({...prev, file: {value: prev.file.value, validated: true}}))
            }
        }
    }
  }
  screenFn(file.name)
   }

  //  Submit functions
   async function submitFormHandler() {
    let correct = true;
    for(let verification in fields) {
      correct = fields[verification].validated ? correct : false;
    } 

    if(correct) {
      setDisabled(true);
      let formData = new FormData();
      formData.set('name', fields.name.value);
      formData.set('email', fields.email.value);
      formData.set('phone', fields.phone.value);
      formData.set('position_id', fields.position.value);
      formData.set('photo', fields.file.value);
      
       // GET TOKEN
      let token;

      try {
        const tokenResponse = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token');
        let tokenData = await tokenResponse.json();
        if(tokenData.success !== true) {
          throw Error(tokenData)
        } 
        token = tokenData.token;

        let usersResponse =  await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', 
        { 
          method: 'POST', 
          body: formData, 
          headers: { 'Token': token }, 
        });
        let usersData = await usersResponse.json();
        if(usersData.success !== true) {
          throw Error(usersData)
        } 
        setDisabled(false); 
        
        alert(`${usersData.message}. User id: ${usersData.user_id}`);
        getUsers(true);
        let clearFields = {};
        for(let prop in fields) {
          clearFields[prop] = {value: '', validated: false};
        }
        setFields(clearFields);
      } catch(error) {
        alert(error?.message);
        console.log(error)
      }  
      
  } else {
    alert('Fill all fields more carefully')
  }
}


  function inputSetFields(property, value) {
    return (value) => {   
      if (typeof property === 'string' && property in fields) setFields(prev => ({...prev, [property]: {value, validated: prev[property].validated}}));
    }
  }

  return (
      <form className='user-form'>
        <div className="user-form__main-info">
           <InputText field={fields.name.value} setFieldCreator={inputSetFields.bind(null, 'name')} validate={validateNameInput} placeholder="Your name"/>
           <InputText field={fields.email.value} setFieldCreator={inputSetFields.bind(null, 'email')} validate={validateEmailInput} placeholder="Email"/>
           <InputText field={fields.phone.value} setFieldCreator={inputSetFields.bind(null, 'phone')} validate={validatePhoneInput} placeholder="Phone"  helperText={'+38 (XXX) XXX - XX - XX'}/>
        </div>

        <div className='user-form__position'>
            <p className="user-form__position-title">Select your position</p>
           {!!positions.length
              ? positions.map((item) =>
              <InputRadio setFieldCreator={inputSetFields.bind(null, 'position')} validate={validatePositionInput} key={item.id} id={'user-form__position-num-' + item.id} label={item.name} value={item.id} name="position"/>)
              : <p className='user-form__position-empty'>Position inputs have to be here, but they don't. Try again later.</p>
          }
        </div>

        <InputFile setFieldCreator={inputSetFields.bind(null, 'file')} validate={validateFileInput} className="user-form__file"/>

        <Button onClick={submitFormHandler} className={`user-form__btn`} text="Sign up" disabled={disabled}></Button>
     
    </form>
  )
}

UserFrom.propTypes = {
    positions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })),
    getUsers: PropTypes.func,
  }

export default UserFrom
