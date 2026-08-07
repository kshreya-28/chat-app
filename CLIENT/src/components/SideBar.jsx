import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);

  const [input, setInput] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const filteredUsers = input
    ? users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase()))
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  // Close the dropdown when clicking anywhere outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='bg-[#001030]/20 text-white w-full p-5 flex flex-col justify-between h-full min-h-0 border-r border-gray-700 relative'>
      {/* Top Header & Search Area */}
      <div className='flex flex-col gap-5 shrink-0 relative z-30'>
        <div className='flex items-center justify-between relative'>
          <img src={assets.logo} alt="logo" className='w-28' />

          {/* Click-based dropdown — no more hover gap closing it early */}
          <div ref={menuRef} className='relative'>
            <img
              src={assets.menu_icon}
              alt="menu"
              onClick={() => setMenuOpen((prev) => !prev)}
              className='w-5 p-1 cursor-pointer'
            />
            {menuOpen && (
              <div className='absolute right-0 top-full pt-2 w-36 z-50'>
                <div className='bg-[#282142] p-2 rounded-md shadow-2xl border border-gray-600'>
                  <p
                    onClick={() => { setMenuOpen(false); navigate('/profile'); }}
                    className='text-sm text-gray-300 hover:text-white cursor-pointer p-2 rounded hover:bg-white/5'
                  >
                    Edit Profile
                  </p>
                  <hr className="my-1 border-t border-gray-600" />
                  <p
                    onClick={() => { setMenuOpen(false); logout(); }}
                    className='cursor-pointer text-sm text-gray-300 hover:text-white p-2 rounded hover:bg-white/5'
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='bg-[#282142] flex items-center gap-2 px-3 py-2 rounded-md border border-gray-600'>
          <img src={assets.search_icon} alt="search" className='w-4' />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search here..."
            className='bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full'
          />
        </div>
      </div>

      {/* Users List */}
      <div className='flex flex-col flex-1 overflow-y-auto my-3 gap-1 relative z-10'>
        {filteredUsers.map((user, index) => (
          <div
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
            }}
            key={index}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${
              selectedUser?._id === user._id ? 'bg-[#282142]/50' : ''
            }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt=""
              className='w-[35px] h-[35px] rounded-full object-cover'
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
  )
}

export default Sidebar;