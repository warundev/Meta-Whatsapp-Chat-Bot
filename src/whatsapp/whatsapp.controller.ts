import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('whatsapp')
export class WhatsappController {
  @Get('test')
  test() {
    return "warun's test whatsapp message";
  }

  @Get('webhook')
  challangewebhook(@Req() req: Request, @Res() res: Response) {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
      if (mode === 'subscribe' && token === process.env.WHATSAPP_CHALLANGE_KEY) {
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(400);
    }
  }

  @Post('webhook')
handlewebhook(@Req() req: Request, @Res() res: Response) {
  const body = req.body;

  if (
    body.object === 'whatsapp_business_account' &&
    body.entry?.[0]?.changes?.[0]?.value?.messages
  ) {
    const value = body.entry[0].changes[0].value;

    const message = value.messages[0];
    const contact = value.contacts[0];

    const phoneNumber = contact.wa_id;             // Sender's number
    const senderName = contact.profile.name;       // Sender's name
    const messageBody = message.text?.body;        // Message text (check optional chaining)

    console.log('=============================');
    console.log('📩 Incoming WhatsApp Message:');
    console.log(`👤 Name: ${senderName}`);
    console.log(`📞 Phone: ${phoneNumber}`);
    console.log(`💬 Message: ${messageBody}`);
    console.log('=============================');

    this.sendmessage(phoneNumber, "hello from Meta Chat Bot!");
  }

  res.sendStatus(200);
}



  async sendmessage(to:string, message:string) {
    const axios = require('axios');
let data = JSON.stringify({
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": to,
  "type": "text",
  "text": {
    "preview_url": false,
    "body": message
  }
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.WHATSAPP_API_KEY}`
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

}
}