import React, { useContext, useState } from 'react';
import './login.css';
import image from '../../assets/Background.jpg';
import { FcPlus } from 'react-icons/fc';
import axios from '../../axios/axios';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { GiNothingToSay } from 'react-icons/gi';
import { MdSmsFailed } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

function Login() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isRegistered, setRegistered] = useState(true);
  const [firsName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sudahAda, setSudahAda] = useState(false);
  const [tidakada, settidakAda] = useState(false);

  //login input
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const sendDataUser = (e) => {
    e.preventDefault();
    axios
      .get('/api/auth/users')
      .then((response) => {
        const data = response.data.data.filter((data) => data.email === email);
        if (data.length > 0) {
          setSudahAda(true);
          setTimeout(() => {
            setSudahAda(false);
          }, 1500);
        } else {
          const data = new FormData();
          data.append('first_name', firsName);
          data.append('last_name', lastName);
          data.append('email', email);
          data.append('password', password);
          data.append('avatar', avatar);

          axios
            .post('/api/auth/user', data, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((response) => {
              if (response.status === 201) {
                setIsSuccess(true);
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setPreviewAvatar(null);
                setTimeout(() => {
                  setIsSuccess(false);
                }, 1500);
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((error) => {
        if (error.response.data.data.length <= 0) {
          const data = new FormData();
          data.append('first_name', firsName);
          data.append('last_name', lastName);
          data.append('email', email);
          data.append('password', password);
          data.append('avatar', avatar);

          axios
            .post('/api/auth/user', data, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((response) => {
              if (response.status === 201) {
                setIsSuccess(true);
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setPreviewAvatar(null);
                setTimeout(() => {
                  setIsSuccess(false);
                }, 1500);
              }
            })
            .catch((err) => console.log(err));
        }
      });
  };
  const onUploadImage = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreviewAvatar(URL.createObjectURL(file));
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .get('/api/auth/users')
      .then((response) => {
        const data = response.data.data.filter((user) => user.first_name.toLowerCase() === loginUsername.toLowerCase() && user.password === loginPassword);
        if (data.length > 0) {
          if (data[0].email) {
            dispatch({ type: 'LOGIN' });
            navigate('/home?username=' + loginUsername + '&email=' + data[0].email);
          }
        } else {
          settidakAda(true);
          setTimeout(() => {
            settidakAda(false);
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
        // if (err.data.length <= 0) {
        //   settidakAda(true);
        //   setTimeout(() => {
        //     settidakAda(false);
        //   }, 1500);
        // }
      });
  };
  return (
    <div className="auth">
      <div className={`popModal ${isSuccess ? 'active' : ''}`}>
        <IoIosCheckmarkCircle className="check" />
        <span>Sign Up Successfully</span>
      </div>
      <div className={`popModal ${sudahAda ? 'activegagal' : ''}`}>
        <MdSmsFailed className="gagal" />
        <span>Your email is already use</span>
      </div>
      <div className={`popModal ${tidakada ? 'activeNoting' : ''}`}>
        <GiNothingToSay className="gagal" />
        <span>Your account doesn't exist</span>
      </div>
      <div className="auth__warpper">
        <div className="auth__header">
          <div onClick={() => setRegistered(!isRegistered)} className={`switch__signUp ${isRegistered ? 'active' : ''}`}>
            Sign Up
          </div>
          <div
            onClick={() => {
              setFirstName('');
              setLastName('');
              setEmail('');
              setPassword('');
              setPreviewAvatar(null);
              setRegistered(!isRegistered);
            }}
            className={`switch__logIN ${isRegistered ? 'active' : ''}`}
          >
            Login
          </div>
        </div>
        <div className="auth__content">
          {isRegistered ? (
            <>
              {' '}
              <span>Login To App</span>
              <form className="form-input">
                <input value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} required type="username" placeholder="Enter Your Username *" />
                <input value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required type="password" placeholder="Enter Your Password *" />
                <button onClick={onLoginSubmit} type="submit">
                  Submit
                </button>
              </form>
            </>
          ) : (
            <>
              {' '}
              <span>Sign Up For Free</span>
              <div className="avatar">
                <div className="image">
                  <img src={previewAvatar || image} alt="avatar" />
                  <label htmlFor="avatar-image">
                    <FcPlus className="icons" />
                  </label>
                </div>
              </div>
              <form className="form-input">
                <input type="file" hidden id="avatar-image" onChange={onUploadImage} />
                <div className="firstLast__name">
                  <input value={firsName} onChange={(e) => setFirstName(e.target.value)} required type="text" placeholder="First Name *" />
                  <input value={lastName} onChange={(e) => setLastName(e.target.value)} required type="text" placeholder="Last Name *" />
                </div>
                <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Email Address *" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Set Password *" />
                <button onClick={sendDataUser} type="submit">
                  Submit
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
