import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { userDummyData } from '../assets/assets'

const HomePage = () => {
  // 1. Fixed: Initialize as null instead of false (since it expects a user object)
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <div className='w-full h-screen sm:px-[15%] sm:py-[5%] flex items-center justify-center'>
      <div 
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full w-full grid grid-cols-1 relative transition-all duration-300 ${
          selectedUser 
            ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' 
            : 'md:grid-cols-[350px_1fr]' // Sets a clean fixed width for sidebar when no one is active
        }`}
      >
        {/* Left Sidebar Panel */}
        <Sidebar
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          userDummyData={userDummyData}
        />

        {/* Center Chat Window Container */}
        {selectedUser ? (
          <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        ) : (
          <div className="hidden md:flex flex-col items-center justify-center text-gray-400 bg-[#282142]/5">
            <p className="text-lg font-medium">No Conversation Selected</p>
            <p className="text-xs text-gray-500 mt-1">Choose a friend from the left sidebar to begin messaging.</p>
          </div>
        )}

        {/* Right Info Sidebar Panel (Only shows up when a user profile is actively open) */}
        {selectedUser && <RightSidebar selectedUser={selectedUser} />}
        
      </div>
    </div>
  )
}

export default HomePage