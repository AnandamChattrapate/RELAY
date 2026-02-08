import express from 'express'
const router=express.Router();
import Message from '../models/message.js'
import Chat from '../models/chat.js'

// send message
export const sendMessage=async (req,res)=>{
try{
    console.log(req.body)
    const currentUser=req.body.cId;
    const otherUser=req.body.oId;
    const message=req.body.text;
    const existingChat= await Chat.findOne({users:{$all:[currentUser,otherUser]}})
    console.log("existing chat :",existingChat)
    const ChatId=existingChat._id;
    const newMessage=await Message.create({
        chatId:ChatId,
        senderId:currentUser,
        text:message
    })
    console.log("new message : ",newMessage)
    if (!newMessage){
        return res.status(400).json({message:"unable to send message "})
    }
    return res.status(200).json({message:"message sent successfully  ",payload:newMessage})

    // if (existingChat){
    //     // fetch message of that chat id
    //     //const messages=await Message.find({chatId:existingChat._id})
    // }else{
    //     // create a new chat ie add in chats
    //     // then in messages send the current message to reciever
    // }
}catch(err){
return res.status(400).json({message:err.message })
}
}
// read messages
export const getAllMesages=async(req,res)=>{
    try{
        // const cId=req.body.cId;
        // const oId=req.body.oId;
        // // we are sending chat i dfrom front end 
        // const chat=await Chat.findOne(
        //     {users: {$all:[cId,oId]}}
        // )
        const ChatId=req.params.chatId;
        const messages=await Message.find({
            chatId:ChatId
        }).sort({createdAt:-1});
        // sort messages based on time 
        if (!messages){
            return res.status(400).json({message:"no messages exists , send first message :) "})
        }
    else if (messages.length==0){
        return res.status(200).json({message:"no messages exists , send first message :) "})
    }

        return  res.status(200).json({message:"chats of 2 users ",payload:messages})




    }catch(err){
        return res.status(400).json({message:err.message })

    }
}