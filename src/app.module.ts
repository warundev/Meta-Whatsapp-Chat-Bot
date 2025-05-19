import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsappController } from './whatsapp/whatsapp.controller';
import { config } from 'process';
import { ConfigModule } from '@nestjs/config';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { OpenaiService } from './openai/openai.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, WhatsappController],
  providers: [AppService, WhatsappService, OpenaiService],
})
export class AppModule {}
