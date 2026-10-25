import express from 'express';
import dotenv from 'dotenv';
import chatRouter from './src/routes/chat.router';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use('/api/v1/chat', chatRouter);

export default app;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}
