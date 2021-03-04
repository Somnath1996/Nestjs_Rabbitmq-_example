import { Controller, Get } from '@nestjs/common';
import { ClientsModule, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @MessagePattern('notifications')
  getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {

    console.log("********")
  
    const originalMsg = context.getMessage();
    console.log(`PATTERFN: ${context.getPattern()}`);
    console.log(originalMsg.content.toString());
    const channel = context.getChannelRef()
    channel.ack(originalMsg);
  }

  @Get()
  async getHello(@Payload() data: number[], @Ctx() context: RmqContext) {
   
   return this.appService.getHello();
  }
}
