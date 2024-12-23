import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { WsAuthGuard } from 'src/auth/ws-auth.guard';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway()
export class RequestsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly requestsService: RequestsService) {}

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('createRequest')
  async handleCreateRequest(@MessageBody() createRequestDto: CreateRequestDto) {
    const requests = await this.requestsService.createRequest(createRequestDto);
    console.log(requests);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('acceptRequest')
  async handleAcceptRequest(@MessageBody() requestId: number) {
    const appointment = await this.requestsService.acceptRequest(requestId);
    console.log(appointment);
  }
}