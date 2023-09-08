import {Injectable, OnModuleInit} from "@nestjs/common"
import {io, Socket} from 'socket.io-client'

@Injectable()
export class socketClient implements OnModuleInit{
    // Firstly we are going to go ahead and connect to the socket, so first lets just go a head and install the socket library, or the socket io client library (npm add socket.io-client)
    // then we will go ahead and actually create an instance of the socket io connection

    public socketClient : Socket;
   // now let add a constructer 
   constructor()
   {
    // we pass here the URL to our websocket server that would connected with
    this.socketClient = io("http://localhost:3000") // so this should actually make a connection to the websocket server
   }
   // after we implement OnModuleInit we implement his method 'onModuleInit'
   onModuleInit()
   {
    this.registerConsumeEvents();
   }
   private registerConsumeEvents() {
    //once the method has initially we should be able to have this socket client instance, so we can listen to the connect event which is bassically
    //means that when our client has connected it is  going to trigger this event 
         this.socketClient.on('connect', () => {
            console.log('connect to gateway');
    });
       
   }
  

}