import React, { useContext } from 'react';
import './Chat.css';
import { BiCheckDouble } from 'react-icons/bi';
import { IoIosArrowDropdown } from 'react-icons/io';
import { useRef } from 'react';
import axios from '../../axios/axios';
import { AuthContext } from '../../App';

function Chat(props) {
  const { dispatch } = useContext(AuthContext);
  const refMenu = useRef();

  const onHandleMenu = () => {
    refMenu.current.classList.toggle('active');
  };
  const onHandlerDelete = () => {
    axios
      .delete('/api/v1/chats/' + props.message._id)
      .then((response) => dispatch({ type: 'DELETED' }))
      .catch((err) => console.log(err));
  };
  return (
    <div className={`chat_w ${props.message.received ? 'recieve' : ''}`}>
      <span className="username">{props.message.username}</span>
      <span className={`chat ${props.message.received ? 'reciever' : ''}`}>
        <span ref={refMenu} className="chat__menu">
          <span onClick={onHandlerDelete}>Delete</span>
          <span>Teruskan</span>
        </span>
        <IoIosArrowDropdown className="chat__dropDown" onClick={onHandleMenu} />

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
