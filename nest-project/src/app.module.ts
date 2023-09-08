import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { socketModule } from './socket/socket.module';

@Module({
  imports: [socketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
