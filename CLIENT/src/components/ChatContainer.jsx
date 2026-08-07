import React, { useContext, useState, useEffect, useRef } from "react";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [input, setInput] = useState('');

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (input.trim() === '') return;
    await sendMessage({ text: input.trim() });
    setInput('');
  };

   const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Select an image file');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Reject files that would blow past the server's body limit after base64 inflation
    const MAX_SIZE_MB = 7; // leaves headroom under the server's 10mb limit
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`Image too large. Please select an image under ${MAX_SIZE_MB}MB.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    try {
      const base64Image = await convertToBase64(file);
      await sendMessage({ image: base64Image });
    } catch (error) {
      toast.error('Failed to process image');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };
  

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return selectedUser ? (
    <div className='h-full flex flex-col justify-between relative overflow-hidden border-r border-gray-700 bg-black/10'>
      {/* Header */}
      <div className='flex items-center gap-3 py-3 px-4 border-b border-stone-500 shrink-0 bg-[#001030]/20'>
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className='w-8 h-8 rounded-full object-cover' />
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          {selectedUser.fullName}
          {onlineUsers?.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </p>
        <img 
          onClick={() => setSelectedUser(null)} 
          src={assets.arrow_icon} 
          alt="" 
          className='md:hidden max-w-7 cursor-pointer' 
        />
        <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5' />
      </div>

      {/* Messages Scroll Area */}
      <div ref={scrollContainerRef} className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages?.map((msg, index) => (
          <div 
            key={index} 
            className={`flex items-end gap-2 ${msg.senderId === authUser?._id ? 'justify-end' : 'justify-start flex-row-reverse'}`}
          >
            {msg.image ? (
              <img 
                src={msg.image} 
                alt="attachment" 
                className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden' 
              />
            ) : (
              <p className={`p-3 max-w-[250px] text-sm rounded-lg break-all bg-violet-500/30 text-white ${
                msg.senderId === authUser?._id ? 'rounded-br-none' : 'rounded-bl-none'
              }`}>
                {msg.text}
              </p>
            )}

            <div className="text-center text-xs">
              <img 
                src={
                  msg.senderId === authUser?._id 
                    ? (authUser?.profilePic || assets.avatar_icon) 
                    : (selectedUser?.profilePic || assets.avatar_icon)
                } 
                alt="" 
                className='w-6 h-6 rounded-full object-cover' 
              />
              <p className='text-gray-400 text-[10px] mt-1'>{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className='p-3 bg-[#0e0c1a] border-t border-gray-800 shrink-0'>
        <div className='flex items-center gap-3'>
          <div className='flex-1 flex items-center bg-gray-100/10 px-3 rounded-full'>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={(e) => (e.key === 'Enter' ? handleSendMessage(e) : null)}
              type="text"
              placeholder='Send a message'
              className='flex-1 text-sm p-3 border-none outline-none text-white placeholder-gray-400 bg-transparent'
            />
            <input 
              ref={fileInputRef}
              onChange={handleSendImage} 
              type="file" 
              id='image' 
              accept='image/*' 
              hidden 
            />
            <label htmlFor="image">
              <img src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer' />
            </label>
          </div>
          <img
            onClick={handleSendMessage}
            src={assets.send_button}
            alt=""
            className='w-7 cursor-pointer'
          />
        </div>
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/5 max-md:hidden h-full'>
      <img src={assets.logo_icon} className='max-w-16' alt="" />
      <p className="text-sm">Select a user to start chatting</p>
    </div>
  );
};

export default ChatContainer;