import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from "../../context/ChatContext"

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext)

  return (
    <div className='w-full h-screen sm:px-[10%] sm:py-[5%] flex items-center justify-center bg-[#0e0c1a]'>
      <div 
        className={`backdrop-blur-xl bg-white/5 border border-gray-600 rounded-2xl overflow-hidden h-full w-full grid relative transition-all duration-300 ${
          selectedUser 
            ? 'grid-cols-1 md:grid-cols-[1fr_1.8fr_1.2fr]' 
            : 'grid-cols-1 md:grid-cols-[1fr_2fr]'
        }`}
      >
        <Sidebar />
        <ChatContainer />
        {selectedUser && <RightSidebar />}
      </div>
    </div>
  )
}

export default HomePage