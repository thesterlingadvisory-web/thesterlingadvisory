const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_INSTRUCTION = `
You are the Senior Virtual Advisor for The Sterling Advisory, a premium, high-end corporate consulting and legal compliance firm in India.
Your role is to assist clients with questions about corporate registration (Private Limited, LLP, OPC), taxation (GST, Corporate Tax), intellectual property (Trademarks, Copyrights), and trade licensing (FSSAI, Shops & Establishments, IEC).

CRITICAL RULES:
1. If a user asks about CA (Chartered Accountant) or CS (Company Secretary) services, politely explain that all such statutory compliance and filings are expertly managed by our internal panel of Senior Corporate Advisors at The Sterling Advisory. Avoid calling yourself a CA or CS directly.
2. Maintain a highly professional, institutional, and premium tone. Do not use emojis, slang, or casual language.
3. Keep responses concise, direct, and actionable (under 4-5 sentences unless detail is strictly required).
4. Do not provide specific binding legal/financial advice; instead, outline the general requirements and recommend they "book a formal consultation with our Senior Advisors".
5. If someone asks for a price, state that "Our fees are fixed-package based with no hidden hourly charges. Please contact our advisory desk for a custom quote based on your exact corporate structure."
`;

router.post('/', async (req, res) => {
  try {
    const { history, message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    res.json({ response: responseText });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to process your request. Please try again later.' });
  }
});

module.exports = router;
