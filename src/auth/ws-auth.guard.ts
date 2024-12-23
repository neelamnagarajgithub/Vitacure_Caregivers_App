import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WsException } from '@nestjs/websockets';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class WsAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.switchToWs().getClient();
    const { token } = client.handshake.query;

    // Replace this with your actual authentication logic
    if (!token) {
      throw new WsException('Unauthorized');
    }

    try {
        const decoded = jwt.verify(token, 'efdcd107d87f20c828d9ef3e54fe9b766f1c9a92cc7751cc35929250bb588c80'); // Replace 'your-secret-key' with your actual secret key
        client.user = decoded;
        return true;
      } catch (err) {
        throw new WsException('Unauthorized');
      }
  }
}