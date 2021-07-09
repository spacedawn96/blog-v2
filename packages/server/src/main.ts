import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './modules/common/filters/http-exception.filter';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './modules/common/interceptors/timeout.interceptor';
import { LoggingInterceptor } from './modules/common/interceptors/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalInterceptors(new TimeoutInterceptor(), new LoggingInterceptor());
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
