import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {

  const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);

  const [input, setInput] = useState(false);
  const navigate = useNavigate();

  const filteredUsers = input 
    ? users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase())) 
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div className='bg-[#001030]/20 text-white w-full p-5 flex flex-col justify-between h-full border-r border-gray-700'>
      <div className='flex flex-col gap-5'>
        
        {/* Top Header */}
        <div className='flex items-center justify-between'>
          <img src={assets.logo} alt="logo" className='w-28' />
          <div className='relative group cursor-pointer'>
            <img src={assets.menu_icon} alt="menu" className='w-5' />
            <div className='absolute right-0 top-full mt-2 w-32 bg-[#282142] p-3 rounded-md hidden group-hover:block border border-gray-600 z-10'>
              <p onClick={() => navigate('/profile')} className='text-sm text-gray-300 hover:text-white cursor-pointer mb-2'>
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p onClick={() => logout()} className='cursor-pointer text-sm text-gray-300 hover:text-white'>
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className='bg-[#282142] flex items-center gap-2 px-3 py-2 rounded-md border border-gray-600'>
          <img src={assets.search_icon} alt="search" className='w-4' />
          <input 
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search here..."
            className='bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full'
          />
        </div>

        {/* Users List */}
        <div className='flex flex-col gap-2 overflow-y-auto max-h-[60vh]'>
          {filteredUsers.map((user, index) => (
            <div
              onClick={() => setSelectedUser(user)}
              key={index}
              className={`relative flex items-center gap-3 p-2 rounded cursor-pointer max-sm:text-sm ${
                selectedUser?._id === user._id ? 'bg-[#282142]/50' : ''
              }`}
            >
              <img
                src={user?.profilePic || assets.avatar_icon}
                alt=""
                className='w-[35px] aspect-[1/1] rounded-full object-cover'
              />
              <div className='flex flex-col leading-5'>
                <p className='text-sm font-medium text-white'>{user.fullName}</p>
                {onlineUsers.includes(user._id) ? (
                  <span className='text-green-400 text-xs'>Online</span>
                ) : (
                  <span className='text-neutral-400 text-xs'>Offline</span>
                )}
              </div>

              {unseenMessages[user._id] > 0 && (
                <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>
                  {unseenMessages[user._id]}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Footer */}
      <div className='border-t border-gray-700 pt-3'>
        <p onClick={() => logout()} className='cursor-pointer text-sm text-gray-400 hover:text-white'>
          Logout
        </p>
      </div>
    </div>
  )
}

export default Sidebar;