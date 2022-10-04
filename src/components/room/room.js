import { useState, useEffect } from 'react';

const Room = ({ socket, username, room }) => {
  const [roomUsers, setRoomUsers] = useState([]);


  useEffect(() => {
    socket.on('conversations', (data) => {
      console.log(data);
      setRoomUsers(data);
    });

    return () => socket.off('conversations');
  }, [socket]);


  return (
    <div className={`uk-padding room-container`}>

      <div>
        {roomUsers.length > 0 && <h6>{roomUsers.length} Users in room:</h6>}
        <ul className='userList'>
          {roomUsers.map((user) => (
            <li className='uk-light'
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>


    </div>
  );
};

export default Room;
