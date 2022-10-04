import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom'; // Add this
import { useEffect } from 'react';

const Home = ({username, setUsername, room, setRoom, socket }) => {

  const navigate = useNavigate(); // Add this

  const redirectChat = () => {
    if (room.length !== 0 && username.length !== 0) {
      socket.emit('addUser', { username, room });
    }else{
      return false;
    }

    navigate('/message', { replace: true });
  };

  return (
    <div className='container'>
      <div className='uk-card uk-card-default uk-card-hover uk-card-secondary bg-light-dark'>
        <div className='uk-card-body'>
            <h3 class='uk-card-title uk-text-center uk-margin-medium-bottom'>Messenger</h3>         
            <div className='uk-grid'>
                <div class="uk-inline uk-width-1-1">
                  <a class="uk-form-icon uk-form-icon-flip" uk-icon="icon: pencil"></a>
                  <input
                    className='uk-input uk-margin-small-bottom'
                    placeholder='Username...'
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              
                <div class="uk-inline uk-width-1-1">
                  <a class="uk-form-icon uk-form-icon-flip" uk-icon="icon: pencil"></a>
                  <input 
                    className='uk-input uk-margin-small-bottom'
                    placeholder='Room Name'
                    onChange={(e) => setRoom(e.target.value)}
                  />
                </div>
            </div>

            <button
              className={`uk-button uk-button-primary uk-margin-medium-top uk-width-1-1`}
              onClick={redirectChat}>
              Join Room
            </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
