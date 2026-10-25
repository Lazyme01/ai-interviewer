import React, { useState } from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
    FaCheckCircle,
} from "react-icons/fa";
import { BsRobot, BsArrowRight } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import axios from "axios"
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Step1SetUp({ onStart }) {
    const { userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true)

        const formdata = new FormData()
        formdata.append("resume", resumeFile)

        try {
            const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true })
            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);
            setAnalyzing(false);
        } catch (error) {
            console.log(error)
            setAnalyzing(false);
        }
    }

    const handleStart = async () => {
        setLoading(true)
        try {
            const result = await axios.post(ServerUrl + "/api/interview/generate-questions", {
                role,
                experience,
                mode,
                resumeText,
                projects,
                skills,
            }, { withCredentials: true })

            if (userData) {
                dispatch(setUserData({ ...userData }))
            }
            setLoading(false)
            onStart(result.data)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='min-h-screen flex items-center justify-center bg-zinc-950 text-white px-4 py-8 sm:py-12 relative overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-200'
        >
            {/* Ambient background glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

            <div className='w-full max-w-5xl bg-zinc-900/85 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl grid md:grid-cols-12 overflow-hidden relative z-10'>
                {/* LEFT COLUMN: Overview */}
                <motion.div
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className='md:col-span-5 bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-950 p-8 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden'
                >
                    <div>
                        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6'>
                            <HiSparkles size={13} /> Step 1: Configuration
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                            Setup Your AI Interview
                        </h2>

                        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8">
                            Calibrate role expectations, experience level, and optionally parse your resume for ultra-realistic conversational scenarios.
                        </p>

                        <div className='space-y-3.5'>
                            {[
                                {
                                    icon: <FaUserTie className="text-emerald-400" />,
                                    title: "Target Role & Experience",
                                    desc: "Calibrate question depth & seniority",
                                },
                                {
                                    icon: <FaMicrophoneAlt className="text-teal-400" />,
                                    title: "Adaptive Voice Avatar",
                                    desc: "Natural speech cadence & active listening",
                                },
                                {
                                    icon: <FaChartLine className="text-cyan-400" />,
                                    title: "Instant Analytics",
                                    desc: "Confidence, technical & articulation scores",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className='flex items-start gap-3.5 bg-white/5 border border-white/5 p-3.5 rounded-2xl hover:border-emerald-500/30 transition-all'
                                >
                                    <div className='p-2 rounded-xl bg-white/5 mt-0.5'>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className='text-zinc-200 font-semibold text-sm'>{item.title}</p>
                                        <p className='text-zinc-400 text-xs mt-0.5'>{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className='mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-xs text-zinc-400'>
                        <BsRobot size={15} className='text-emerald-400' />
                        <span>Powered by Gemini & High-Fidelity Voice AI</span>
                    </div>
                </motion.div>

                {/* RIGHT COLUMN: Form Controls */}
                <motion.div
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="md:col-span-7 p-8 sm:p-10 bg-zinc-900/60 flex flex-col justify-center"
                >
                    <div className='mb-6'>
                        <h3 className='text-2xl font-bold text-white tracking-tight'>
                            Interview Parameters
                        </h3>
                        <p className='text-zinc-400 text-xs sm:text-sm mt-1'>
                            Enter target credentials or upload a resume to auto-fill.
                        </p>
                    </div>

                    <div className='space-y-4'>
                        {/* Role Input */}
                        <div>
                            <label className='block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5'>
                                Target Role
                            </label>
                            <div className='relative'>
                                <FaUserTie className='absolute top-3.5 left-4 text-zinc-400' size={14} />
                                <input
                                    type='text'
                                    placeholder='e.g. Senior Frontend Engineer, DevOps, Product Manager'
                                    className='w-full pl-11 pr-4 py-3 bg-zinc-800/80 border border-white/10 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white placeholder-zinc-500 outline-none text-sm transition-all'
                                    onChange={(e) => setRole(e.target.value)}
                                    value={role}
                                />
                            </div>
                        </div>

                        {/* Experience Input */}
                        <div>
                            <label className='block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5'>
                                Experience Level
                            </label>
                            <div className='relative'>
                                <FaBriefcase className='absolute top-3.5 left-4 text-zinc-400' size={14} />
                                <input
                                    type='text'
                                    placeholder='e.g. 2 years, Entry Level, 5+ years'
                                    className='w-full pl-11 pr-4 py-3 bg-zinc-800/80 border border-white/10 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white placeholder-zinc-500 outline-none text-sm transition-all'
                                    onChange={(e) => setExperience(e.target.value)}
                                    value={experience}
                                />
                            </div>
                        </div>

                        {/* Mode Select */}
                        <div>
                            <label className='block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5'>
                                Interview Round
                            </label>
                            <select
                                value={mode}
                                onChange={(e) => setMode(e.target.value)}
                                className='w-full py-3 px-4 bg-zinc-800/80 border border-white/10 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white outline-none text-sm transition-all cursor-pointer'
                            >
                                <option value="Technical" className="bg-zinc-900 text-white">Technical Interview</option>
                                <option value="HR" className="bg-zinc-900 text-white">HR & Behavioral Interview</option>
                            </select>
                        </div>

                        {/* Resume Upload Box */}
                        {!analysisDone ? (
                            <div
                                onClick={() => document.getElementById("resumeUpload").click()}
                                className='border-2 border-dashed border-white/15 hover:border-emerald-500/50 bg-white/5 hover:bg-emerald-500/5 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 group'
                            >
                                <FaFileUpload className='text-3xl mx-auto text-emerald-400 group-hover:scale-110 transition-transform mb-2' />
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    id="resumeUpload"
                                    className='hidden'
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                />
                                <p className='text-zinc-200 font-semibold text-sm'>
                                    {resumeFile ? resumeFile.name : "Upload Resume (PDF - Optional)"}
                                </p>
                                <p className='text-zinc-500 text-xs mt-1'>
                                    {resumeFile ? "File selected. Click below to parse." : "Tailors questions to your actual projects & stack"}
                                </p>

                                {resumeFile && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUploadResume();
                                        }}
                                        className='mt-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-4 py-1.5 rounded-lg text-xs transition-all shadow-md'
                                    >
                                        {analyzing ? "Analyzing Resume..." : "Extract Profile & Skills"}
                                    </motion.button>
                                )}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 space-y-3'
                            >
                                <div className='flex items-center gap-2 text-emerald-400 text-sm font-bold'>
                                    <FaCheckCircle size={15} />
                                    <span>Resume Analyzed Successfully</span>
                                </div>

                                {skills.length > 0 && (
                                    <div>
                                        <p className='text-xs font-semibold text-zinc-300 mb-1.5'>Extracted Skills:</p>
                                        <div className='flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1'>
                                            {skills.map((s, i) => (
                                                <span key={i} className='bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-medium'>
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {projects.length > 0 && (
                                    <div>
                                        <p className='text-xs font-semibold text-zinc-300 mb-1'>Projects Identified:</p>
                                        <ul className='text-xs text-zinc-400 list-disc list-inside space-y-0.5 max-h-16 overflow-y-auto pr-1'>
                                            {projects.map((p, i) => (
                                                <li key={i} className='truncate'>{p}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            onClick={handleStart}
                            disabled={!role || !experience || loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full mt-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-950 font-bold py-3.5 rounded-xl text-base shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer'
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
                                    <span>Generating Questions...</span>
                                </>
                            ) : (
                                <>
                                    <span>Start Interview</span>
                                    <BsArrowRight size={18} />
                                </>
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Step1SetUp
