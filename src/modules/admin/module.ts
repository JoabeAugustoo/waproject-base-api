import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { DemandController } from './controllers/demand';
import { TestController } from './controllers/test';
import { UserController } from './controllers/user';
import { RenewTokenMiddleware } from './middlewares/renewToken';
import { DemandRepository } from './repositories/demand';
import { ProductRepository } from './repositories/product';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { DemandService } from './services/demand';
import { UserService } from './services/user';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, UserController, TestController, DemandController],
  providers: [AuthService, UserRepository, UserService, DemandRepository, DemandService, ProductRepository]
})
export class AdminModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RenewTokenMiddleware).forRoutes('*');
  }
}
