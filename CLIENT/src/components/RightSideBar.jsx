import React, { useContext } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext)
  const { onlineUsers } = useContext(AuthContext)

  if (!selectedUser) return null

  // Extract media/images sent in conversation
  const mediaMessages = messages?.filter(msg => msg.image) || []

  return (
    <div className='h-full bg-[#001030]/20 text-white p-5 flex flex-col items-center overflow-y-auto max-md:hidden'>
      <div className='flex flex-col items-center text-center mt-6 gap-2'>
        <img 
          src={selectedUser?.profilePic || assets.avatar_icon} 
          alt="" 
          className='w-20 h-20 rounded-full object-cover border-2 border-violet-500' 
        />
        <h3 className='text-lg font-semibold flex items-center gap-2 mt-2'>
          {selectedUser?.fullName}
          {onlineUsers?.includes(selectedUser?._id) && (
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
          )}
        </h3>
        <p className='text-xs text-gray-400 max-w-[200px]'>
          {selectedUser?.bio || "Hey, I am using QuickChat!"}
        </p>
      </div>

      <hr className='w-full border-gray-700 my-5' />

      <div className='w-full'>
        <p className='text-sm font-medium text-gray-300 mb-3'>Shared Media</p>
        <div className='grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto'>
          {mediaMessages.length > 0 ? (
            mediaMessages.map((msg, index) => (
              <img 
                key={index} 
                src={msg.image} 
                alt="" 
                className='w-full h-16 object-cover rounded cursor-pointer hover:opacity-80' 
              />
            ))
          ) : (
            <p className='text-xs text-gray-500 col-span-3'>No media shared yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default RightSidebar