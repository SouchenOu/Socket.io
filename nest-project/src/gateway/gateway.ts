import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";



// we use websocket gateway decorator to decorate this class 
// here websocketGateway bydefault it is going to listen to the same port that your http api is listening on (here our port is running on port 3000), i can change it if i want
@WebSocketGateway()
export class MyGateway{

    //lets show how we can listen to events or consume events on the gateway server 




    /* we use it to subscribe to a spesific message (what does it mean ! ) --> when you comes to websocket applications or real time application we have a websocket
    server that can receive events from the client that is consuming the websocket server, for example if you build a chat application, the client that is going to consume the websocket server
    and the chat needs to send  events to the websocket  gateway using the websocket protocol it is not going to  be using http it is going to use websocket protocol (we use http when we send a post request to the server ) */
    /*** When a user send a message  the other connected user wont actually see the message until you actually fire an event, so essentially what we want to do is we want to subscribe to
     * a spesific message so we call it 'newMessage'
      */
    @SubscribeMessage('newMessage')
    // then define a method
    onNewMessage(@MessageBody() body: any  )
    {
        console.log(body);
    }
}