import Message from "../models/Message.js";
import User from "../models/User.js";
import  cloudinary from "../lib/cloudinary.js";
import { io, userSocketMap } from "../server.js";

// Get all users except the logged-in user + unseen message counts
export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all other users excluding password
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password");

    // Optimize unseen count calculation using MongoDB Aggregation
    const unseenCounts = await Message.aggregate([
      { $match: { receiverId: userId, seen: false } },
      { $group: { _id: "$senderId", count: { $sum: 1 } } }
    ]);

    // Convert aggregation result array into an object { [senderId]: count }
    const unseenMessages = {};
    unseenCounts.forEach((item) => {
      unseenMessages[item._id.toString()] = item.count;
    });

    res.json({ success: true, users: filteredUsers, unseenMessages });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get all messages between logged-in user and selected user
export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: myId },
      ]
    }).sort({ createdAt: 1 }); // Sort by oldest to newest

    // Mark incoming messages from the selected user as seen
    await Message.updateMany(
      { senderId: selectedUserId, receiverId: myId, seen: false },
      { seen: true }
    );

    res.json({ success: true, messages });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to mark a specific message as seen by message ID
export const markMessageAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { seen: true },
      { new: true }
    );
    
    res.json({ success: true, message: updatedMessage });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Send message to selected user
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl
    });

    // Emit the new message to the receiver's socket
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.json({ success: true, newMessage });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};