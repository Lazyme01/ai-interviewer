import React from 'react'
import { BsRobot } from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'

function Footer() {
  return (
    <footer className='border-t border-white/5 bg-zinc-950/80 backdrop-blur-xl py-12 px-4 sm:px-6 relative overflow-hidden'>
      {/* Ambient glow */}
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none'></div>

      <div className='w-full max-w-6xl mx-auto bg-zinc-900/60 backdrop-blur-xl rounded-3xl border border-white/10 py-10 px-6 sm:px-10 text-center relative z-10 shadow-2xl'>
        <div className='flex justify-center items-center gap-3 mb-4'>
          <div className='w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20'>
            <BsRobot size={18} />
          </div>
          <div className='flex items-center gap-2'>
            <span className='font-bold text-lg text-white tracking-tight'>
              InterviewIQ
            </span>
            <span className='text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1'>
              <HiSparkles size={10} /> AI
            </span>
          </div>
        </div>

        <p className='text-zinc-400 text-sm max-w-xl mx-auto leading-relaxed'>
          Next-generation AI mock interview platform engineered to sharpen technical depth, 
          communication, and executive confidence for top engineering & product roles.
        </p>

        {/* Feature badges */}
        <div className='flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 text-xs text-zinc-400'>
          {["AI Voice Synthesis", "Speech Recognition", "Resume Context", "Adaptive Scoring", "PDF Dossier"].map((tag, i) => (
            <span key={i} className='px-3 py-1 rounded-full bg-white/5 border border-white/5'>
              {tag}
            </span>
          ))}
        </div>

        <div className='mt-8 pt-6 border-t border-white/5 text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <p>© {new Date().getFullYear()} InterviewIQ. All rights reserved.</p>
          <p className='text-zinc-500'>Crafted with intelligence & precision.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
