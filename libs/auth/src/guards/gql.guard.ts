import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { isPublic } from '../decorators';

@Injectable()
export class GqlGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest<T = any>(context: ExecutionContext): T {
    const _ctx = GqlExecutionContext.create(context);
    return _ctx.getContext().req;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const _isPublic = isPublic(context, this.reflector);
    if (_isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
