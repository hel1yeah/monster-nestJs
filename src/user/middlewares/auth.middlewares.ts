import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { UserService } from '@app/user/user.service';
import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

@Injectable()
export class AuthMiddlewares implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];
    try {
      const decodeToken = verify(token, process.env.JWT_SECRET);
      const user = await this.userService.findById(decodeToken.id);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
      return;
    }

    next();
  }
}

export default AuthMiddlewares;
