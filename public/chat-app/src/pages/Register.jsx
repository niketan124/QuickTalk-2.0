import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/')
    }
  }, [])
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password
      });
      if (data.status === false) {
        toast.error(data.msg, {
          position: 'bottom-right',
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
        })
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
      }
      navigate('/setAvatar')
      window.length.reload()
    }
  }

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      })
      return false
    }
    else if (email === "") {
      toast.error("email should not be empty", {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      })
      return false
    } else if (password.length < 8) {
      toast.error("password should be greater than 8 characters", {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      })
      return false
    }
    else if (password !== confirmPassword) {
      toast.error("password and confirm password should be same", {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      return false
    }
    return true
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    document.getElementById('a').click()
  }

  return (
    <>
      <FormContainer>
        <div className="left-container">
          <h1 className='dwn-title'>Download Mobile App now!</h1>
          <h3 className='down-arrow'>&darr;</h3>
          <button onClick={handleClick}
            className="btn top-btn"><i className="fa fa-download"></i>
            <a id='a' href='https://github.com/niketan124/QuickTalk-Nik/releases/download/v1.0/Nik-QuickTalk-b59b1ed9f28a425eb19318001105dfba-signed.apk'
             download>
              Download
            </a>
          </button>
        </div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='brand'>
            <img draggable='false' src={Logo} alt="logo" />
            <h1>QuckTalk 2.0</h1>
          </div>
          <input
            type="text"
            placeholder='Username'
            name='username'
            autoComplete='of'
            onChange={e => handleChange(e)}
          />
          <input
            type="email"
            autoCorrect='true'
            placeholder='Email'
            name='email'
            autoComplete='of'
            onChange={e => handleChange(e)}
          />
          <input
            type="password"
            placeholder='Password'
            name='password'
            onChange={e => handleChange(e)}
          />
          <input
            type="password"
            placeholder='Confirm Password'
            name='confirmPassword'
            onChange={e => handleChange(e)}
          />
          <button type='submit'>Create User</button>
          <span>already have an account ? <Link to="/login">Login</Link></span>
        </form>
        <p>&copy; {new Date().getFullYear()} The-Nik-Dev</p>
      </FormContainer>
      <ToastContainer></ToastContainer>
    </>
  )
}

const FormContainer = styled.div`
  .left-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 300px;
    .dwn-title {
        text-align: center;
        max-width: 200px;
        color: white;
        position: absolute;
        transform: translate(-600px, -80px);
      }
      .down-arrow {
        font-size: 50px;
        color: white;
        position: absolute;
        transform: translate(-600px, 10px);
      }
      .top-btn {
        position: absolute;
        transform: translate(-600px, 100px);
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        font-size: 1rem;
        text-transform: uppercase;
        border-radius: 0.4rem;
        transition: 0.5s ease-in-out;
        &:hover {
          background-color: #4e0eff;
        }
        a {
          margin: 10px;
          color: white;
          text-decoration: none;
        }
      }
  }
  p {
    padding: 0;
    color: white;
  }
  user-select: none;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      user-select: none !important;
      height: 5rem;
    }
    h1 {
      user-select: none;
      color: white;
      text-transform: uppercase;
    }
  }
  span {
    text-transform: uppercase;
    user-select: none;
    color: white;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
      &:hover {
        color: #E900FF;
      }
    }
  }
  form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      background-color: #00000076;
      border-radius: 2rem;
      padding: 3rem 5rem;
      input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus {
          border: 0.1rem solid #997af0;
          outline: none;
        }
      }
      button {
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        font-size: 1rem;
        text-transform: uppercase;
        border-radius: 0.4rem;
        transition: 0.5s ease-in-out;
        &:hover {
          background-color: #4e0eff;
        }
      }
    }


`

export default Register