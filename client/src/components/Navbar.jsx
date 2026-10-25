import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from "motion/react"
import { BsRobot, BsClockHistory, BsChevronDown } from "react-icons/bs";
import { HiOutlineLogout, HiSparkles } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';

function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true })
            dispatch(setUserData(null))
            setShowUserPopup(false)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header className='sticky top-0 z-50 flex justify-center px-4 pt-3 sm:pt-5 pb-2 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-transparent backdrop-blur-md'>
            <motion.div
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className='w-full max-w-6xl bg-zinc-900/85 backdrop-blur-xl rounded-2xl sm:rounded-full border border-white/10 shadow-2xl shadow-black/60 px-5 sm:px-7 py-3 flex justify-between items-center relative'
            >
                {/* Brand / Logo */}
                <div
                    onClick={() => navigate("/")}
                    className='flex items-center gap-3 cursor-pointer group select-none'
                >
                    <div className='w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 group-hover:scale-105 group-hover:shadow-emerald-500/40 transition-all duration-300'>
                        <BsRobot size={20} className='group-hover:rotate-6 transition-transform' />
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='font-bold text-base sm:text-lg text-white tracking-tight group-hover:text-emerald-400 transition-colors'>
                            InterviewIQ
                        </span>
                        <span className='hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'>
                            <HiSparkles size={11} /> AI
                        </span>
                    </div>
                </div>

                {/* Right Actions */}
                <div className='flex items-center gap-3 relative'>
                    {userData ? (
                        <div className='relative'>
                            <button
                                onClick={() => setShowUserPopup(!showUserPopup)}
                                className='flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white text-sm group focus:outline-none focus:ring-2 focus:ring-emerald-500/30'
                            >
                                <div className='w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-zinc-950 font-bold flex items-center justify-center text-xs shadow-md'>
                                    {userData?.name ? userData.name.slice(0, 1).toUpperCase() : <FaUserAstronaut size={13} />}
                                </div>
                                <span className='hidden md:block max-w-[120px] truncate font-medium text-zinc-200'>
                                    {userData?.name?.split(" ")[0]}
                                </span>
                                <BsChevronDown size={11} className={`text-zinc-400 transition-transform duration-200 ${showUserPopup ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {showUserPopup && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className='absolute right-0 mt-3 w-60 bg-zinc-900/95 backdrop-blur-2xl shadow-2xl border border-white/10 rounded-2xl p-2.5 z-50 text-white'
                                    >
                                        <div className='px-3 py-2.5 mb-1.5 rounded-xl bg-white/5 border border-white/5'>
                                            <p className='text-xs text-zinc-400 font-medium'>Signed in as</p>
                                            <p className='text-sm font-semibold text-emerald-400 truncate mt-0.5'>{userData?.name}</p>
                                        </div>

                                        <div className='space-y-1'>
                                            <button
                                                onClick={() => {
                                                    setShowUserPopup(false);
                                                    navigate("/history");
                                                }}
                                                className='w-full text-left text-sm py-2 px-3 rounded-xl hover:bg-white/10 text-zinc-300 hover:text-white flex items-center gap-2.5 transition-colors'
                                            >
                                                <BsClockHistory size={15} className='text-emerald-400' />
                                                Interview History
                                            </button>

                                            <button
                                                onClick={handleLogout}
                                                className='w-full text-left text-sm py-2 px-3 rounded-xl hover:bg-rose-500/10 text-rose-400 hover:text-rose-300 flex items-center gap-2.5 transition-colors'
                                            >
                                                <HiOutlineLogout size={16} />
                                                Log Out
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setShowAuth(true)}
                            className='flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-md shadow-emerald-500/20 transition-all'
                        >
                            <HiSparkles size={14} />
                            Sign In
                        </motion.button>
                    )}
                </div>
            </motion.div>

            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        </header>
    )
}

export default Navbar
