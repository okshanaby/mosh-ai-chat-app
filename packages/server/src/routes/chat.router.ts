import { Router } from 'express';
import { chatController } from '../controllers/chat.controller';

const chatRouter = Router();

chatRouter.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

chatRouter.post('/', chatController.sendMessage);

export default chatRouter;