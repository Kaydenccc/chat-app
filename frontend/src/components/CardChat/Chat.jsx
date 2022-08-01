import React from 'react';
import './Chat.css';
import { BiCheckDouble } from 'react-icons/bi';
function Chat(props) {
  return (
    <div className={`chat_w ${props.message.received ? 'recieve' : ''}`}>
      <span className="username">{props.message.username}</span>
      <span className={`chat ${props.message.received ? 'reciever' : ''}`}>
        <span>{props.message.msg}</span>
        <span className="chat__des">
          <span className="chat__ket">
            19:12 <BiCheckDouble className="chat__centang" />
          </span>
        </span>
        <span className={`${props.message.received ? 'sayap-kanan' : 'sayap'}`}></span>
      </span>
    </div>
  );
}

export default Chat;
