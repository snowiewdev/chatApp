import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from "socket.io-client";

import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages'
import Input from '../Input/Input';
import TextContainer from '../TextContainer/TextContainer';

import './Chat.css';

const ENDPOINT = 'https://chatapp-react-node-socket.herokuapp.com/'; // server location; local development: http://localhost:5000/

let socket; 

const Chat = ({ location }) => {

  const [ name, setName ] = useState('');
  const [ room, setRoom ] = useState('');
  const [ users, setUsers] = useState('');
  const [ message, setMessage] = useState('');
  const [ messages, setMessages] = useState([]);

  var connectionOptions = {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
  } // setting to allow CORS (Cross-Origin Resources Sharing)

  useEffect(()=>{
    //location.search = parameters of url, data = object holding the values
    const { name, room } = queryString.parse(location.search);

    socket = io.connect(ENDPOINT, connectionOptions); // connect to our backend server

    setName(name);
    setRoom(room);

    //send '...' &  back to server and it can then process 
    socket.emit('join', { name, room }, (error) => {
      if (error){
        alert(error);
      }
    });

    //only when values inside [] changes, the useEffect will re-render
  }, [ENDPOINT, location.search]);

  //handling messages
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(messages => [...messages, message]); //add new message
    });

    socket.on('roomData', ({users}) =>{
      setUsers(users);
    });

  }, []);

  const sendMessage = (event) => {

    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage('') );
    }
  };

  return (
    <div className="chatOuterContainer">
      <div className="chatInnerContainer">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
    
  );
};

export default Chat;