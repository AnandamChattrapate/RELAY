
import express from 'express'
const ChatApp=express.Router();
// import {verifyToken} from '../middleware/auth.js'
import {accessChat,getAllChats} from '../controllers/chatController.js';

// api/chat  POST to Create or access 1-1 chat
 ChatApp.post('/',accessChat); // add verify token
// GET /api/chat
ChatApp.get('/',getAllChats); // add verify token

export default ChatApp;


