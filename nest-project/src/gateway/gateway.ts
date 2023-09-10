import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server} from 'socket.io'
import {OnModuleInit} from  '@nestjs/common'


// we use websocket gateway decorator to decorate this class 
// here websocketGateway bydefault it is going to listen to the same port that your http api is listening on (here our port is running on port 3000), i can change it if i want
@WebSocketGateway({
    cors: {
        // i put here the api of the server that i want to be connected with
        origin: ['http://localhost:3001']
    },
})
// here we implement an interface OnModuleInit
export class MyGateway implements OnModuleInit{

    //lets show how we can listen to events or consume events on the gateway server 
    /****now how do we send messages back from the gateway the server right back the client  */
            /* so what we are going to do is we are going to define a property called server you can define it with whatever you want but we 
            are going to type annotate this with the server type */
            /***then we need to use a decorator in order to actually get the instance , so we user websocketserver decorator in order to give the actual socket instance  */
        @WebSocketServer()
        server: Server;
        // this is a method --> the reason i am creating this because i want bassicaly listen to an event on the actual socket , on the actual server 
        onModuleInit() {
            // we are going to listen to the connection , and the instance is the socket instance 
            this.server.on('connection', (socket) => {
                console.log(socket.id);
                console.log('connected');
            });
        }
        //*****now whatever i send a message, i want to go a head and send a message to the other clients that are connected  to it*/
    /* we use it to subscribe to a spesific message (what does it mean ! ) --> when you comes to websocket applications or real time application we have a websocket
    server that can receive events from the client that is consuming the websocket server, for example if you build a chat application, the client that is going to consume the websocket server
    and the chat needs to send  events to the websocket  gateway using the websocket protocol it is not going to  be using http it is going to use websocket protocol (we use http when we send a post request to the server ) */
    /*** When a user send a message  the other connected user wont actually see the message until you actually fire an event, so essentially what we want to do is we want to subscribe to
     * a spesific message so we call it 'newMessage' */
    @SubscribeMessage('newMessage')
    // then define a method
    onNewMessage(@MessageBody() body: any  )
    {
        //fire some messages to the gateway so that way we can see what is happening
        //so when we create an event in postman whith name 'newMessage' --> then write a message (hello souchen) --> then connect , the console.log(boby) will print 'hello souchen'
        console.log(body);
        /* so now we are listening in postman to 'onMessage' event which means the server is going to actually emit that event, so what we do is whenever we receive 
    the new message event   we will go ahead and reference the server we will emit the 'onMessage'      */
    // so now every single client that is going to be connected to the server listens to the 'onMessage' event will receive this payload whenever a new message event is
    //received on the websocket  server
        this.server.emit('onMessage',{
            msg: 'New message',
            content: body, 
        } )
        /*so now it is working , every user that is connected to the websocket server that is listening to that spesific event 
        'onMessage' , is going to receive it, if we dont listen to it we are not going to receive that message  */
        
    }
    
}