import React, { useState } from 'react';

const Send = ({ socket, username, room }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message !== '') {
      const timestamp = Date.now();
      socket.emit('sendMessage', { username, room, message, timestamp });
      setMessage('');
    }
  };

  return (
    <div className={`uk-grid uk-padding`}>
      <div className='uk-width-expand'>
      <input
        className={`uk-input`}
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        />
      </div>
      <div className='uk-width-1-3'>
        <button className='uk-button uk-button-primary' onClick={sendMessage}>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default Send;
