// so now we will setup a connection to the actual websocket server 
/**** we want to just make a connection to the websocket server using the socket.io client library , in the last doc 'gateway.ts' we used the actual 
 * platform socket.io and that is actually setting up the socket.io server , but now we are going to using the socket.io client library to make the 
 * actual connection to  the server */

import {Module} from '@nestjs/common'

@Module({
    providers: []
})
export class socketModule{}


 