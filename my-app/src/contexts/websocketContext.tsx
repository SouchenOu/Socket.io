import { createContext } from "react";
import {io, Socket} from "socket.io-client"


// create an instance of the socket by calling the io function  and then the url to our websocket server
export const socket= io('http://localhost:3000')
// then lets create the websocket context so we will create a variable call websocketContext and this variable will hold the value of the context


// socket is a generic type so we will set the type to a socket , that means that this context will provide that value for us, that socket value 
// so the default value will just pass in socket like that (socket)
export const WebsocketContext = createContext<Socket>(socket)
export const WebsocketProvider = WebsocketContext.Provider;