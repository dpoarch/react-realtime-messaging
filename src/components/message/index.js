import Room from '../room/room';
import Send from '../forms/send_message_form';
import Messages from './messages';
import { useNavigate } from 'react-router-dom';

const MessageLayout = ({ username, room, socket }) => {
  const navigate = useNavigate();

  const removeUser = () => {
    const timestamp = Date.now();
    socket.emit('removeUser', { username, room, timestamp });
    navigate('/', { replace: true });
  };


  return (<>
    <div className="uk-container">
          <nav class="uk-navbar-container uk-margin" uk-navbar>
          <div class="uk-navbar-center">

              
              <h4 className="uk-dark">{room}</h4>
              <button className='uk-button uk-button-primary' onClick={removeUser}>
                Exit Room
              </button>

          </div>
      </nav>
      <div className='chatContainer uk-card uk-card-default uk-background-secondary uk-light bg-light-dark'>

        <Room socket={socket} username={username} room={room} />

        <div>
          <Messages username={username} socket={socket} />
          <Send socket={socket} username={username} room={room} />
        </div>
      </div>
    </div>
  </>
  );
};

export default MessageLayout;
