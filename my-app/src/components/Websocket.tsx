import {useContext, useEffect} from "react"
import { WebsocketContext } from "../contexts/WebsocketContext"
import { useState } from "react";
// In this compnents we bassicaly want to use the websocket context so we can actually get the socket value 

export const Websocket = () =>{
    const [value, setValue] = useState('')
    const socket = useContext(WebsocketContext);
    useEffect(() =>{
        socket.on('connect', () => {
            console.log("Connected!!!");
        });
            socket.on('onMessage', (data) =>{
                console.log('hello whatsup');
                console.log(data);
            });
            // and we will also setup a cleanup function , so basically when  the component announced from the DOM, so what we wanna do is we want to call socket.off 
            return() => {
                // we want to listen to events when the components mounts and then when the component unmounts we will unregister this events , so what we will do is we will call 
                // socket.off and we will just unregister the connect event, and unregister the onMessage event
                console.log('Unregistering Events!....');
                //socket.off('connect');
                socket.off('onMessage');
            }
    })
     const onSubmit = () => {
        socket.emit('newMessage', value);
        setValue('');
     }

        
    
    
    
    /* then  we will use the useEffect hook and inside this useEffect we will subscribe to messages that the gateway could send us , in nest-project doc we impliment the nestjs gateway server or the websocket server, inside this doc you will see that inside gateway.ts 
    we are emitting an 'onMessage' event  which means that all of the conected clients that consumers to this websocker server will receive the 'onMessage' event if they listen to it
    That means if you listen to that event we can receive it, so what i wil do is i will reference the socket 
    instance and i will call on()*/
    return (
        <div>
            <div>
                <h1>webSocketComponents</h1>
                <input type="text" value={value} onChange={(event) => setValue(event.target.value)}></input>
                <button onClick={onSubmit}>Send</button>
            </div>
        </div>
    )
}