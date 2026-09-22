import express from 'express';
import dotenv from 'dotenv';
import { z } from 'zod';
import { chatService } from './src/services/chat.service';
import { chatController } from './src/controllers/chat.controller';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get('/api/v1/chat', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.post('/api/v1/chat', chatController.sendMessage);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
