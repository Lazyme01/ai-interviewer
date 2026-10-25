import React from 'react'
import { BsRobot, BsShieldCheck } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from "axios"
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth({ isModel = false }) {
    const dispatch = useDispatch()

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            const result = await axios.post(ServerUrl + "/api/auth/google", { name, email }, { withCredentials: true })
            dispatch(setUserData(result.data))
        } catch (error) {
            console.log(error)
            dispatch(setUserData(null))
        }
    }

    return (
        <div className={`
            w-full 
            ${isModel ? "py-2" : "min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 py-20 relative overflow-hidden"}
        `}>
            {/* Ambient glow when standalone */}
            {!isModel && (
                <>
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                </>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`
                    w-full 
                    ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-10 sm:p-12 rounded-[32px]"}
                    bg-zinc-900/90 backdrop-blur-2xl shadow-2xl border border-white/10 relative overflow-hidden text-center
                `}
            >
                {/* Brand Logo */}
                <div className='flex items-center justify-center gap-3 mb-6'>
                    <div className='w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25'>
                        <BsRobot size={22} />
                    </div>
                    <div className='text-left'>
                        <div className='flex items-center gap-2'>
                            <span className='font-bold text-lg text-white tracking-tight'>InterviewIQ</span>
                            <span className='text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'>AI</span>
                        </div>
                        <p className='text-[11px] text-zinc-400'>Intelligent Preparation Platform</p>
                    </div>
                </div>

                <h2 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3'>
                    Welcome Back
                </h2>

                <p className='text-zinc-400 text-sm leading-relaxed mb-8 max-w-sm mx-auto'>
                    Sign in to launch AI mock interviews, track longitudinal scores, and download comprehensive performance dossiers.
                </p>

                {/* Google Sign In Button */}
                <motion.button
                    onClick={handleGoogleAuth}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-white hover:bg-zinc-100 text-zinc-900 rounded-full font-semibold text-sm shadow-xl transition-all cursor-pointer'
                >
                    <FcGoogle size={22} />
                    <span>Continue with Google</span>
                </motion.button>

                {/* Security badge */}
                <div className='flex items-center justify-center gap-1.5 mt-6 text-xs text-zinc-500'>
                    <BsShieldCheck size={14} className='text-emerald-400' />
                    <span>Fast, encrypted & secure authentication</span>
                </div>
            </motion.div>
        </div>
    )
}

export default Auth

