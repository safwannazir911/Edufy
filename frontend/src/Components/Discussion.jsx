import React, { useState, useEffect, useCallback, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
const Discussion = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [webSocket, setWebSocket] = useState(null);
  const usernameRef = useRef(null);

  const generateRandomString = useCallback((length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }, []);

  const role = "student";

  useEffect(() => {
    usernameRef.current = generateRandomString(8);
    console.log(usernameRef.current);

    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/${usernameRef.current}`);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const receivedMessage = event.data;
      setMessages((prevMessages) => [...prevMessages, { text: receivedMessage, sender: 'other' }]);
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
    if (webSocket && inputMessage.trim() !== '') {
      const newMessage = { text: inputMessage, sender: 'me' };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      webSocket.send(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className='m-4'>
      <h2>Discussion</h2>
      <div>
        <div>
          <h1>Welcome, {usernameRef.current && usernameRef.current.split('@')[0]}!</h1>
          <p>Role: {role}</p>
        </div>
        <div>
          <ul className="list-group">
            {messages.map((message, index) => (
              <li
                key={index}
                className={`list-group-item ${message.sender === 'me' ? 'list-group-item-success' : 'list-group-item-info'
                  }`}
              >
                {message.text}
                {message.sender === 'me' ? <FontAwesomeIcon icon={faUser} className='chat'/> : null
                }



              </li>
            ))}
          </ul>
          <div className="input-group mt-3">
            <input
              type='text'
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="form-control"
              placeholder="Type your message..."
            />
            <button onClick={sendMessage} className="btn btn-primary ml-2">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Discussion };
