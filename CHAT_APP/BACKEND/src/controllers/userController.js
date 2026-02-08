import express from 'express'
import User from '../models/user.js'
import chat from '../models/chat.js'
import message from '../models/message.js'
import user from '../models/user.js'


// Get all chats for a specific user
export const getUser = async (req,res) => {
    try {
        // Extract userId from request params or query
        const { userId } = req.params;
        
        // Find all chats where the user is a participant
        const userChats = await chat.find({ participants: userId }).populate('participants', 'name email');
        
        console.log("Chats for user: ", userId);
        
        // Send the chats as response
        return res.status(200).json({ chats: userChats });
    } catch (err) {
        console.error("Error fetching user chats:", err);
        return res.status(500).json({ message: 'Server error' });
    }
}

// Search for users by name or email
export const searchUser = async (req, res) => {
    try {
        // Get search query from request
        const {search}=req.query;
        
        // If no search term provided, return error
        if (!search) {
            return res.status(400).json({ message: 'Search term required' });
        }
        
        // Search users by name (case-insensitive) and return _id + name
const foundUsers = await User.find({
    name: { $regex: search, $options: 'i' }
}) 
// select('name');
console.log(foundUsers)
        // Send found users as response
        res.status(200).json({ users: foundUsers });
    } catch (err) {
        console.error("Error searching users:", err);
        res.status(500).json({ message: 'Server error' });
    }
}