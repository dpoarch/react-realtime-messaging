import { useState, useEffect, useRef } from 'react';

const Messages = ({ username, socket }) => {
  const [getMessages, setGetMessages] = useState([]);

  const messagesColumnRef = useRef(null);

  useEffect(() => {
    socket.on('getMessage', (data) => {
      console.log(data);
      setGetMessages((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          timestamp: data.timestamp,
        },
      ]);
    });
    return () => socket.off('getMessage');
  }, [socket]);

  useEffect(() => {
    socket.on('messaging', (userMessages) => {
      userMessages = JSON.parse(userMessages);
      userMessages = sortMessages(userMessages);
      setGetMessages((state) => [...userMessages, ...state]);
    });

    return () => socket.off('messaging');
  }, [socket]);

  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [getMessages]);

  function sortMessages(messages) {
    return messages.sort(
      (a, b) => parseInt(a.timestamp) - parseInt(b.timestamp)
    );
  }

  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className='messagesColumn' ref={messagesColumnRef}>
      {getMessages.map((msg, i) => (
        <>
        {msg.username == username ? (
        <>
        <div className='uk-margin-small-bottom height' key={i}>
       
            <div className='uk-card uk-card-default uk-background-default uk-dark right'>
              <div className='uk-card-body card-body-custom'>
              <div className='blockText'>
              <span className='uk-dark'>
                  {formatDateFromTimestamp(msg.timestamp)}
                </span>
                <span className='uk-text-bold uk-dark'>{msg.username}</span>
                
              </div>
              <p className='uk-dark'>{msg.message}</p>
              </div>
            </div>
        </div>
          </>

           ) : (
             <>
            <div className='uk-margin-small-bottom height' key={i}>
            
          <div className='uk-card uk-card-default uk-background-default uk-dark left'>
            <div className='uk-card-body card-body-custom'>
            <div className='blockText'>
            <span className='uk-dark'>
                {formatDateFromTimestamp(msg.timestamp)}
              </span>
              <span className='uk-text-bold uk-dark'>{msg.username}</span>
            </div>
            <p className='uk-dark'>{msg.message}</p>
            </div>
          </div>
      </div>
            </>
          )}
        </>
      ))}
    </div>
  );
};

export default Messages;
