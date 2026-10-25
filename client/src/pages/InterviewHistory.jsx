import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft } from 'react-icons/fa'
import { BsCalendar3, BsChevronRight, BsRobot, BsPlus } from 'react-icons/bs'
import { motion } from 'motion/react'

function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })
                setInterviews(result.data)
            } catch (error) {
                console.log(error)
            }
        }

        getMyInterviews()
    }, [])

    return (
        <div className='min-h-screen bg-zinc-950 text-white py-10 px-4 sm:px-6 relative overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-200'>
            {/* Ambient background glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

            <div className='w-full max-w-5xl mx-auto relative z-10'>
                {/* Header Row */}
                <div className='mb-10 w-full flex items-center justify-between gap-4 flex-wrap pb-6 border-b border-white/10'>
                    <div className='flex items-center gap-4'>
                        <button
                            onClick={() => navigate("/")}
                            className='p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all shadow-md cursor-pointer'
                            title="Return to Home"
                        >
                            <FaArrowLeft size={16} />
                        </button>

                        <div>
                            <h1 className='text-2xl sm:text-4xl font-extrabold text-white tracking-tight'>
                                Interview History
                            </h1>
                            <p className='text-zinc-400 text-xs sm:text-sm mt-0.5'>
                                Review past sessions, longitudinal metrics, and performance reports
                            </p>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate("/interview")}
                        className='bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold px-5 py-2.5 rounded-full text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer'
                    >
                        <BsPlus size={18} />
                        <span>New Interview</span>
                    </motion.button>
                </div>

                {/* Content Area */}
                {interviews.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='bg-zinc-900/60 backdrop-blur-2xl p-12 rounded-3xl border border-white/10 text-center max-w-md mx-auto shadow-2xl space-y-5'
                    >
                        <div className='w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-emerald-400'>
                            <BsRobot size={26} />
                        </div>
                        <div>
                            <h3 className='text-lg font-bold text-white'>No Interviews Yet</h3>
                            <p className='text-zinc-400 text-xs sm:text-sm mt-1 leading-relaxed'>
                                You haven't completed any mock interviews. Launch your first session to calibrate your readiness.
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate("/interview")}
                            className='bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold px-6 py-3 rounded-full text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer'
                        >
                            Start Interview
                        </motion.button>
                    </motion.div>
                ) : (
                    <div className='grid gap-4 sm:gap-5'>
                        {interviews.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => navigate(`/report/${item._id}`)}
                                className='bg-zinc-900/80 backdrop-blur-2xl p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-emerald-500/40 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-emerald-950/30 hover:-translate-y-0.5 group'
                            >
                                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-5'>
                                    <div>
                                        <div className='flex items-center gap-2 mb-1.5'>
                                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                                                item.status === "completed"
                                                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                                    : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                                            }`}>
                                                {item.status}
                                            </span>
                                            <span className='text-xs text-zinc-500'>•</span>
                                            <span className='text-xs text-zinc-400 font-medium'>
                                                {item.mode} Round
                                            </span>
                                        </div>

                                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                                            {item.role}
                                        </h3>

                                        <div className='flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-2'>
                                            <span className='bg-white/5 px-2.5 py-1 rounded-lg border border-white/5'>
                                                {item.experience}
                                            </span>
                                            <span className='flex items-center gap-1.5'>
                                                <BsCalendar3 size={12} className='text-zinc-500' />
                                                {new Date(item.createdAt).toLocaleDateString(undefined, {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-white/5'>
                                        {/* Score Block */}
                                        <div className="text-left md:text-right">
                                            <p className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-tight">
                                                {item.finalScore || 0}
                                                <span className="text-sm font-normal text-zinc-500">/10</span>
                                            </p>
                                            <p className="text-[11px] text-zinc-400 uppercase tracking-wider">
                                                Final Score
                                            </p>
                                        </div>

                                        {/* Arrow Action */}
                                        <div className='w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all'>
                                            <BsChevronRight size={15} className='group-hover:translate-x-0.5 transition-transform' />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default InterviewHistory
