import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Discussion = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello!', sender: 'other' },
    { text: 'Hi there!', sender: 'me' },
    { text: 'How are you?', sender: 'other' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [webSocket, setWebSocket] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [recipientUserId, setRecipientUserId] = useState(null);
  const usernameRef = useRef(null);
  const role = "student"

  useEffect(() => {
    usernameRef.current = generateRandomString(8);
    console.log(usernameRef.current);

    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/${usernameRef.current}`);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.type === 'user_list') {
        // Exclude the current user from the connected users list
        const updatedUsers = data.users.filter(user => user !== usernameRef.current);
        setConnectedUsers(updatedUsers);
      } else {
        const receivedMessage = data.message;
        setMessages((prevMessages) => [...prevMessages, { text: receivedMessage, sender: 'other' }]);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWebSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (webSocket && inputMessage.trim() !== '' && recipientUserId) {
      const newMessage = { text: inputMessage, sender: 'me' };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      webSocket.send(JSON.stringify({ type: 'message', recipient: recipientUserId, message: inputMessage }));
      setInputMessage('');
    }
  };

  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };

  return (
    <div className='container'>
      <div className='row'>

        <div className='col-md-4'>
          <h2 className='mt-3'>Chat</h2>
          <ul className='list-group'>
            {console.log(connectedUsers)}
            {connectedUsers.map((user) => (
              <li key={user} onClick={() => setRecipientUserId(user)} className='list-group-item chat_li'>
                {user}
                {/* Add teacher icon if the role is 'teacher' */}
                {<FontAwesomeIcon icon={faChalkboardTeacher} className='chat' />}
              </li>
            ))}
          </ul>
        </div>


        <div className='col-md-8 mt-4'>
          <div className='card mt-3'>
            <div className='card-header'>
              <h2>Messages</h2>
              <p>Welcome, {usernameRef.current && usernameRef.current.split('@')[0]}!</p>
            </div>
            <div className='card-body'>
              <div className='mb-3'>
                <label htmlFor='recipientSelect' className='form-label'>Select Recipient:</label>
                <select
                  id='recipientSelect'
                  value={recipientUserId || ''}
                  onChange={(e) => setRecipientUserId(e.target.value)}
                  className='form-select'
                >
                  <option value='' disabled>Select recipient</option>
                  {connectedUsers.map((user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </div>

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`d-flex ${message.sender === 'me' ? 'justify-content-end' : 'justify-content-start'}`}
                >
                  <div className={`msg d-flex align-items-center ${message.sender === 'me' ? 'msg-right' : 'msg-left'}`}>
                    {message.text}
                  </div>
                </div>
              ))}



              <div className='input-group mt-3'>
                <input
                  type='text'
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className='form-control'
                  placeholder='Type your message...'
                />
                <button onClick={sendMessage} className='btn btn-primary ml-2'>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Discussion };
