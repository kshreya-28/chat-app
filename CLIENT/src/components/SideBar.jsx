import React, { useContext } from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

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
            type="text"
            placeholder="Search here..."
            className='bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full'
          />
        </div>

        {/* Users List */}
        <div className='flex flex-col gap-2 overflow-y-auto max-h-[60vh]'>
          {userDummyData?.map((user, index) => (
            <div
              key={index}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-[#8185B2]/20 transition-all ${
                selectedUser?._id === user._id ? 'bg-[#8185B2]/30' : ''
              }`}
            >
              <img
                src={user.profilePic || assets.avatar_icon}
                alt=""
                className='w-10 h-10 rounded-full object-cover'
              />
              <div className='flex flex-col'>
                <p className='text-sm font-medium text-white'>{user.fullName}</p>
                <span className='text-xs text-gray-400'>Offline</span>
              </div>
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

export default Sidebar