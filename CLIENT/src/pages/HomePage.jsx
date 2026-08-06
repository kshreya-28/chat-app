import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from "../../context/ChatContext"

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext)

  return (
    <div className='w-full h-screen sm:px-[10%] sm:py-[5%] flex items-center justify-center bg-[#0e0c1a] relative overflow-hidden'>
      {/* Background Glowing Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Glassmorphism Main Container */}
      <div 
        className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-full w-full grid relative transition-all duration-300 ${
          selectedUser 
            ? 'grid-cols-1 md:grid-cols-[300px_1fr_280px]' 
            : 'grid-cols-1 md:grid-cols-[350px_1fr]'
        }`}
      >
        <Sidebar />

        {selectedUser ? (
          <ChatContainer />
        ) : (
          <div className="hidden md:flex flex-col items-center justify-center text-gray-400 bg-white/5">
            <p className="text-lg font-medium">No Conversation Selected</p>
            <p className="text-xs text-gray-500 mt-1">Choose a friend from the left sidebar to begin messaging.</p>
          </div>
        )}

        {selectedUser && <RightSidebar />}
      </div>
    </div>
  )
}

export default HomePage