import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class SuperUserGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //getHandler() for end points //getClass() for classes
    const uids = this.reflector.get<number[]>('uids', context.getHandler());
    const req = context.switchToHttp().getRequest();
    return uids.includes(req.uid);
  }
}
