import express from 'express'
import {sendMessage,getAllMesages} from '../controllers/messageController.js'
import {verifyToken } from '../middleware/auth.js'
const messageRouter=express.Router();

// POST Send message
messageRouter.post('/',sendMessage);

//GET api/:chatId get all messages of a chat
messageRouter.get("/:chatId",getAllMesages);
export default messageRouter;