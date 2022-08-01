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

function Home() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('/api/v1/chats')
      .then((response) => setMessages(response.data.data))
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    let pusher = new Pusher('92228adad1f9e8633ee8', {
      cluster: 'ap1',
    });

    let channel = pusher.subscribe('messages');
    channel.bind('inserted', function (data) {
      if (data) {
        message.pop(message.length - 1, 1);
        setMessages([...messages, data]);
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
      username: 'Anhar',
      avatar: 'anhar.jpg',
      msg: message,
      received: true,
    };
    setMessages([...messages, data]);
    await axios.post('/api/v1/chats/post', {
      username: 'Anhar',
      avatar: 'anhar.jpg',
      msg: message,
      received: true,
    });
    setMessage('');
  };
  return (
    <div className="home">
      <div className="home__left">
        <div className="left__header">
          <div className="left__hedearTop">
            <div className="left__hedearTopLeft">
              <img src={image} alt="avatar" />
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
                <img src={image} alt="avatar" />
              </div>
            </div>
            <div className="CardChat__right">
              <div className="warp__username">
                <h4 className="CardChat__username">Kaydencc</h4>
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
          {messages.map((message) => (
            <Chat key={message._id} message={message} />
          ))}
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
