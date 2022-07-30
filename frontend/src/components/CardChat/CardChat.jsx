import React from 'react';
import './components.css';
import image from '../../assets/Background.jpg';
function CardChat() {
  return (
    <div className="CardChat">
      <div className="CardChat__left">
        <div className="CardChat__hedearTopLeft">
          <img src={image} alt="avatar" />
        </div>
      </div>
      <div className="CardChat__right">
        <div className="warp__username">
          <h4 className="CardChat__username">Kaydencc</h4>
          <p>19:30</p>
        </div>
        <p className="CardChat__message">This is a message</p>
      </div>
    </div>
  );
}

export default CardChat;
