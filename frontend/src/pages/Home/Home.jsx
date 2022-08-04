import React, { useEffect, useState } from 'react';
import './home.css';
import { TbMessage } from 'react-icons/tb';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { TbBrandGravatar } from 'react-icons/tb';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { BsSnow2 } from 'react-icons/bs';
import { BsFillMicFill } from 'react-icons/bs';
import { BsFillStickiesFill } from 'react-icons/bs';
import image from '../../assets/Background.jpg';
import CardChat from '../../components/CardChat/CardChat';
import Chat from '../../components/CardChat/Chat';
import Pusher from 'pusher-js';
import axios from '../../axios/axios';
import { useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../App';

const LOCAL_URL = 'http://localhost:5000/';

function Home(props) {
  const { state } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [reset, setReset] = useState(false);

  //FIND USER BY EMAIL
  useEffect(() => {
    axios
      .get('/api/auth/user/' + searchParams.get('email'))
      .then((response) => {
        console.log('TEST:', response.data.data);
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchParams]);
  console.log(userData);
  useEffect(() => {
    axios
      .get('/api/v1/chats')
      .then((response) => {
        if (response) {
          setMessages(response.data.data);
        }
      })
      .catch((err) => console.error(err));
  }, [state.isDelete, reset]);
  useEffect(() => {
    let pusher = new Pusher('92228adad1f9e8633ee8', {
      cluster: 'ap1',
    });

    let channel = pusher.subscribe('messages');
    channel.bind('inserted', function (data) {
      console.log('DATA', data);
      if (data) {
        setMessages([...messages, data]);
      }
    });
    channel.bind('deleted', function (data) {
      console.log('DATA', data);
      if (data) {
        const res = messages.filter((e) => e._id !== data.id);
        setMessages(res);
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, message]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      _id: 'askdad90endaned933823e2ne2n2o38' + new Date().getTime(),
      username: userData[0].first_name,
      email: searchParams.get('email'),
      msg: message,
      received: true,
    };
    setMessages([...messages, data]);
    await axios.post('/api/v1/chats/post/' + searchParams.get('username'), {
      username: userData[0].first_name,
      email: searchParams.get('email'),
      msg: message,
      received: true,
    });
    setMessage('');
    messages.pop();
    setReset(!reset);
  };
  return (
    <div className="home">
      <div className="home__left">
        <div className="left__header">
          <div className="left__hedearTop">
            <div className="left__hedearTopLeft">
              <img src={userData ? LOCAL_URL + userData[0].avatar : image} alt="avatar" />
            </div>
            <div className="left__headerTopRight">
              <TbBrandGravatar className="icons" />
              <TbMessage className="icons" />
              <BsThreeDotsVertical className="icons" />
            </div>
          </div>
          <div className="left__headerBottom">
            <div className="headerBottom__left">
              <AiOutlineSearch className="icons__headerBottom icons-search" />
              <input type="text" placeholder="Cari atau mulai chat baru" />
            </div>
            <BsSnow2 className="icons__headerBottom headerBottom__right" />
          </div>
        </div>
        <div className="CardChat__wrapper">
          <h3 style={{ textAlign: 'left', paddingLeft: '16px' }}>COMING SOON..</h3>
          <CardChat />
          <CardChat />
          <CardChat />
          <CardChat />
        </div>
      </div>
      <div className="home__right">
        <div className="homeRight__header">
          <div className="CardChat_right">
            <div className="CardChat__left">
              <div className="CardChat__hedearTopLeft">
                <img src={userData ? LOCAL_URL + userData[0].avatar : image} alt="avatar" />
              </div>
            </div>
            <div className="CardChat__right">
              <div className="warp__username">
                <h4 className="CardChat__username">{userData && userData[0].first_name}</h4>
              </div>
              <p className="CardChat__message">online</p>
            </div>
          </div>
          <div className="homeLeft__headerTopRight">
            <AiOutlineSearch className="icons__headerBottom icons-search" />
            <BsThreeDotsVertical className="icons" />
          </div>
        </div>
        <main className="main__chat">
          {messages.map((message) => {
            if (message.username.toLowerCase() === searchParams.get('username').toLowerCase() && message.email === searchParams.get('email')) {
              message.received = true;
              return <Chat key={message._id} message={message} />;
            } else {
              message.received = false;
              return <Chat key={message._id} message={message} />;
            }
          })}
        </main>
        <footer className="homeRight__footer">
          <div className="footer__emoji">
            <MdOutlineEmojiEmotions />
            <BsFillStickiesFill />
          </div>
          <div className="footer__type">
            <form action="">
              <input onChange={(e) => setMessage(e.target.value)} value={message} type="text" placeholder="Ketik pesan" />
              <button onClick={onSubmit} className="send" type="submit">
                Send a message
              </button>
            </form>
          </div>
          <div className="sen">
            <BsFillMicFill />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
