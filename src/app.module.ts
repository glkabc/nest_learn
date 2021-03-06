import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import {
  AppController,
  MyAppController,
} from './module/test-apis/app.controller';
import { AppService } from './module/test-apis/app.service';
import { RolesGuard } from './auth/roles.guard';
import { CatsModule } from './cats/cats.module';
import { HttpExceptionFilter } from './error/http-exception.filter';
// import { BodyParserMiddleware } from './middleware/bodyParser.middleware';
import { LogMiddleware } from './middleware/log.middleware';
import { HomeModule } from './module/home/home.module';
// import { RowBodyParserMiddleware } from './middleware/rowBodyParser.middleware';
import { ValidationPipe } from './pipes/validate.pipe';

@Module({
  imports: [CatsModule, HomeModule],
  controllers: [AppController, MyAppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      // .apply(RowBodyParserMiddleware)
      // .forRoutes('*')
      // .apply(BodyParserMiddleware)
      // .forRoutes('*')
      .apply(LogMiddleware)
      .forRoutes('*');
  }
}
