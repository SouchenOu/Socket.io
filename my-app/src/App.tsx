import React from 'react';
import { socket, WebsocketProvider } from './contexts/WebsocketContext'
import { Websocket } from './components/Websocket';
import './App.css';

function App() {
  return (
    /* so we are not defining the socket as a state variable in our component, we are just literally defining it in a file (WebsocketContext.tsx), importing it
    from that file and then passing that as the provider value     */ 
    <WebsocketProvider value={socket}>
        <Websocket/>
    </WebsocketProvider>
  );
}

export default App;
