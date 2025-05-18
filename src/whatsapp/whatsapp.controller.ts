import { Controller, Get } from '@nestjs/common';

@Controller('whatsapp')
export class WhatsappController {
    @Get("test")
    test()
    {
        return "test whatsapp message";
    }
}
