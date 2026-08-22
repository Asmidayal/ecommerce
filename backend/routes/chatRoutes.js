import express from 'express';
import { beautyHelperChat } from '../controller/chatController.js';

const router = express.Router();

router.post('/chat/beauty-helper', beautyHelperChat);

export default router;