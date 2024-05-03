

import { useState } from 'react';
import { Header } from '../../components/Header';
import background from '../../assets/96efc3f4acbbd24218025f242fae2c4f.png'
import ItemList from '../../components/ItemList';
import './styles.css';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.name){
      const { avatar_url, name, bio, login } = newUser;
      setCurrentUser({ avatar_url, name, bio, login });

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length > 0) {
        setRepos(newRepos);
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <div className='conteudo'>
        <img src={background} alt="background app" className='background'/>
        <div className="info">
          <div>
            <input 
              name='usuario' 
              value={user}
              onChange={event => setUser(event.target.value)}
              placeholder='@username'
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? (
            <>
              <div className='perfil'>
                <img src={currentUser.avatar_url} alt='' className='profile'/>
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ): null}
          {repos?.length > 0 ? (
            <div>
              <h4 className='repositorio'>Repositórios</h4>
              {repos.map(repo => (
                <ItemList key={repo.id} title={repo.name} description={repo.description} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div> 
  );
}

export default App;
