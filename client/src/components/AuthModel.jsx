import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";
import Auth from '../pages/Auth';
import { motion, AnimatePresence } from 'motion/react';

function AuthModel({ onClose }) {
    const { userData } = useSelector((state) => state.user)

    useEffect(() => {
        if (userData) {
            onClose()
        }
    }, [userData, onClose])

    return (
        <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md px-4 p-4'>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className='relative w-full max-w-md'
            >
                <button
                    onClick={onClose}
                    className='absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-20'
                    aria-label="Close dialog"
                >
                    <IoClose size={20} />
                </button>
                <Auth isModel={true} />
            </motion.div>
        </div>
    )
}

export default AuthModel