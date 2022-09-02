import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import $ from 'jquery';

function App() {
  const [connect, setConnect] = useState(false);
  useEffect(() => {
     $.ajax({
       type: 'get',
       url: '/api/checkConnection',
       success: () => {
          setConnect(true);
       },
       error: () => {
          setConnect(false);
       }
     });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{connect ? 'You are connect to your node.js server' : 'Failed to connect to your node.js server'}</p>
      </header>
    </div>
  );
}

export default App;
