export const AppConfig = {
  get WHATSAPP_API_KEY() { return process.env.WHATSAPP_API_KEY; },
  get WHATSAPP_API_VERSION() { return process.env.WHATSAPP_API_VERSION; },
  get WHATSAPP_PHONE_NUMBER_ID() { return process.env.WHATSAPP_PHONE_NUMBER_ID; },
  get WHATSAPP_CHALLANGE_KEY() { return process.env.WHATSAPP_CHALLANGE_KEY; },
  get OPENAI_API_KEY() { return process.env.OPENAI_API_KEY; }
};