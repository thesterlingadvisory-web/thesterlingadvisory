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

    // Fast-path for simple greetings to provide a literally 0ms response
    const lowerMsg = message.trim().toLowerCase();
    const greetings = ['hi', 'hey', 'hello', 'hi there', 'hello there', 'good morning', 'good afternoon', 'good evening'];
    
    if (greetings.includes(lowerMsg)) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders();
      
      const cannedResponse = "Hello! I am your Senior Virtual Advisor at The Sterling Advisory. How may I assist you with your corporate or tax requirements today?";
      res.write(`data: ${JSON.stringify({ text: cannedResponse })}\n\n`);
      res.write('data: [DONE]\n\n');
      return res.end();
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const chat = model.startChat({
      history: history || [],
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const result = await chat.sendMessageStream(message);
    
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
      }
    }
    
    res.write('data: [DONE]\n\n');
    res.end();

  } catch (error) {
    console.error('Gemini API Error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to process your request. Please try again later.' });
    } else {
      res.end();
    }
  }
});

module.exports = router;
