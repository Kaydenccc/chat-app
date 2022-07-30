import React from 'react';
import './Chat.css';
import { BiCheckDouble } from 'react-icons/bi';
function Chat(props) {
  return (
    <div className={`chat_w ${props.reciever ? 'recieve' : ''}`}>
      <span className={`chat ${props.reciever ? 'reciever' : ''}`}>
        <span>This is a message</span>
        <span className="chat__des">
          <span className="chat__ket">
            19:12 <BiCheckDouble className="chat__centang" />
          </span>
        </span>
        <span className={`${props.reciever ? 'sayap-kanan' : 'sayap'}`}></span>
      </span>
    </div>
  );
}

export default Chat;
