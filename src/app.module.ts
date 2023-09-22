import { ClassSerializerInterceptor, Module } from '@nestjs/common'; //6.3
import { APP_INTERCEPTOR } from '@nestjs/core'; //6.3
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  controllers: [AppController],
  providers: [
    AppService, 
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,   //6.3
    }
  ],
})
export class AppModule {}
