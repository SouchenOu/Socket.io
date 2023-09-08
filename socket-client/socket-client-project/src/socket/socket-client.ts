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
      // to send the message to the other server i will simply reference the socket client , and i will emit the event to the websocket gateway
      // the websocket gateWay will receive that event and it is going to fire the event 
      this.socketClient.emit('newMessage', {msg: 'heyy souchen lets learn about sockets'})
    });
    /* after this the connection between this two servers is working, so lets go into our consume project, and lets actually consume those events
    that are being sent from the websocket server, so we have the consumer which is going to consume those events, then we have the emiter i will call the emitter , the emitter is going to emite the event 
    so that is the websocket gateway     */

    /* so what i will do is i want to register the event so it is going to be the same event 
   that is going to be admitted , so the server emits the onMessage event, so we want to consume that event now, so how do we do that    
  so we just need to go ahead and reference this this.socketClient  */
  this.socketClient.on('onMessage', (payload : any) =>{
      console.log(payload);
  })

       
   }
   


}


/*****The websocket gateway is going to receive that event and it is going to emit its own event to all the other clients, and that is what i am doing here */