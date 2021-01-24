import React from 'react'

import onlineIcon from '../../Icons/onlineIcon.png';
import './TextContainer.css';

const TextContainer = ({users}) => {
  return (
    <div className="textContainer">
      <div>
        <h1> Realtime Chat App 💬 </h1>
        <h2> Created with React, Express, Node and Socket.IO ❤️</h2>
        <h2>Try it out right now! ⬅️ </h2>
      </div>
      {
        users
          ? (
            <div>
              <h1> People currently chatting: </h1>
              <div className="activeContainer">
                <h2>
                  {users.map( ({name}) => (
                    <div key={name} className="activeItem">
                      <img alt="online" src={onlineIcon} />
                      {name}
                    </div>
                  )) }
                </h2>
              </div>
            </div>
          ) : null
      }
    </div>
  )
}

export default TextContainer;