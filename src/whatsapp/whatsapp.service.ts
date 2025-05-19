import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AppConfig } from '../config/AppConfig';
import { OpenaiService } from '../openai/openai.service';

@Injectable()
export class WhatsappService {

    constructor(private openaiService: OpenaiService) {}

    async handleusermessage(number: string, message: string){
      const reply = await this.openaiService.generateResponse(message);
      this.sendMessage(number, reply);
    }
  async sendMessage(to: string, message: string): Promise<void> {
    const data = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to,
      type: 'text',
      text: {
        preview_url: false,
        body: message,
      },
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://graph.facebook.com/${AppConfig.WHATSAPP_API_VERSION}/${AppConfig.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AppConfig.WHATSAPP_API_KEY}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  }
}
