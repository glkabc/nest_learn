import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

// import { HttpExceptionFilter } from './error/http-exception.filter';
// https://github.com/staart/api ๅ่ไปฃ็ 
// https://www.jianshu.com/p/eec0586409da

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalGuards(RolesGuard);

  app.enableCors();
  await app.listen(3335);
  console.log('๐๐๐๐ serve is start => ' + (await app.getUrl()));
}
bootstrap();
