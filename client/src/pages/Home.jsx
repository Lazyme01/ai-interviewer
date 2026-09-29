import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthModel from "../components/AuthModel";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { motion } from "motion/react";

import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
} from "react-icons/bs";

import { HiSparkles } from "react-icons/hi";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">

      <Navbar />

      <main className="flex-1">

      <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT */}

        <div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm">

            <HiSparkles size={16} className="bg-green-50 text-green-600" />
            AI Powered Smart Interview Platform

          </div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            className="text-5xl lg:text-7xl font-bold leading-tight mt-8"
          >

            Crack Interviews

            <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">

              With AI

            </span>

          </motion.h1>

          <p className="text-slate-400 mt-8 text-lg leading-8 max-w-xl">

            Practice personalized mock interviews with intelligent AI,
            receive instant feedback, improve communication,
            and track your interview performance.

          </p>
          <div className="flex flex-wrap gap-5 mt-10">

  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.96 }}
    onClick={() => {
      if (!userData) {
        setShowAuth(true);
        return;
      }
      navigate("/interview");
    }}
    className='bg-green-500 text-white px-10 py-3 rounded-full hover:opacity-90 transition shadow-md'>
  
    Start Interview
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.96 }}
    onClick={() => {
      if (!userData) {
        setShowAuth(true);
        return;
      }
      navigate("/history");
    }}
    className='border border-gray-300 px-10 py-3 rounded-full hover:bg-blue-500 transition'
  >
    View History
  </motion.button>

</div>

</div>

{/* RIGHT SIDE */}

<motion.div
  initial={{ opacity: 0, x: 80 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
>

  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

    <div className="flex justify-between items-center">

      <div>
        <p className="text-slate-400 text-sm">
          Current Interview
        </p>

        <h2 className="text-3xl font-bold mt-2">
          Software Engineer
        </h2>
      </div>

      <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
        Live
      </span>

    </div>

    <div className="space-y-6 mt-10">

      {[
        {
          title: "Communication",
          value: "94%",
          width: "94%",
          color: "bg-cyan-400",
        },
        {
          title: "Technical",
          value: "91%",
          width: "91%",
          color: "bg-purple-500",
        },
        {
          title: "Confidence",
          value: "88%",
          width: "88%",
          color: "bg-pink-500",
        },
      ].map((item, index) => (

        <div key={index}>

          <div className="flex justify-between mb-2">
            <span>{item.title}</span>
            <span>{item.value}</span>
          </div>

          <div className="w-full h-2 rounded-full bg-zinc-700">

            <div
              className={`${item.color} h-2 rounded-full`}
              style={{ width: item.width }}
            />

          </div>

        </div>

      ))}

    </div>

  </div>

</motion.div>

</div>

</section>
{/* ================= Statistics ================= */}

<section className="max-w-7xl mx-auto px-6 pb-24">

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="grid grid-cols-2 lg:grid-cols-4 gap-6"
  >

    {[
      {
        number: "15K+",
        title: "Mock Interviews",
      },
      {
        number: "500+",
        title: "Job Roles",
      },
      {
        number: "96%",
        title: "Success Rate",
      },
      {
        number: "24/7",
        title: "AI Support",
      },
    ].map((item, index) => (

      <motion.div
        key={index}
        whileHover={{ y: -8 }}
        className="bg-zinc-900 border border-slate-800 rounded-3xl p-8 text-center"
      >

        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">

          {item.number}

        </h2>

        <p className="text-slate-400 mt-4">

          {item.title}

        </p>

      </motion.div>

    ))}

  </motion.div>

</section>
{/* ================= How It Works ================= */}

<section className="max-w-7xl mx-auto px-6 pb-28">

  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: .6 }}
    className="text-4xl font-bold text-center mb-16"
  >
    How It Works
  </motion.h2>

  <div className="grid md:grid-cols-4 gap-8">

    {[
      {
        icon: <BsRobot size={20} />,
        title: "Choose Role",
        desc: "Select your target job profile."
      },
      {
        icon: <BsMic size={20} />,
        title: "AI Interview",
        desc: "Answer realistic interview questions."
      },
      {
        icon: <BsClock size={20} />,
        title: "Real-Time Analysis",
        desc: "AI evaluates every response instantly."
      },
      {
        icon: <BsBarChart size={20} />,
        title: "Performance Report",
        desc: "Receive detailed feedback and insights."
      }
    ].map((item, index) => (

      <motion.div
        key={index}
        whileHover={{ y: -10 }}
        className="rounded-3xl bg-zinc-900 border border-slate-800 p-8"
      >

        <div className="w-12 h-12 rounded-xl bg-green-500 border border-cyan-500/20 flex items-center justify-center">

          {item.icon}

        </div>

        <h3 className="text-2xl font-semibold mt-6">

          {item.title}

        </h3>

        <p className="text-slate-400 mt-4 leading-7">

          {item.desc}

        </p>

      </motion.div>

    ))}

  </div>

</section>
{/* ================= Features ================= */}

<section className="max-w-7xl mx-auto px-6 pb-28">

  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: .6 }}
    className="text-center"
  >

    <p className="text-cyan-400 font-semibold uppercase tracking-widest">
      Features
    </p>

    <h2 className="text-5xl font-bold mt-4">
      Everything You Need To
      <span className="block text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
        Ace Every Interview
      </span>
    </h2>

    <p className="text-slate-400 mt-6 max-w-2xl mx-auto leading-8">
      Our AI platform prepares you with realistic interview simulations,
      detailed analytics, resume assistance, and personalized feedback.
    </p>

  </motion.div>

  <div className='grid md:grid-cols-2 gap-10'>

    {[
      {
        icon: <BsRobot size={18} />,
        title: "AI Mock Interviews",
        desc: "Practice with an intelligent interviewer that adapts to your responses."
      },
      {
        icon: <BsMic size={18} />,
        title: "Speech Analysis",
        desc: "Improve fluency, confidence, and communication skills instantly."
      },
      {
        icon: <BsBarChart size={18} />,
        title: "Performance Analytics",
        desc: "Track your improvement through comprehensive reports."
      },
      {
        icon: <BsClock size={18} />,
        title: "Real-Time Feedback",
        desc: "Receive immediate suggestions after every answer."
      },
      {
        icon: <BsFileEarmarkText size={18} />,
        title: "Resume Review",
        desc: "Get AI-powered recommendations to strengthen your resume."
      },
      {
        icon: <HiSparkles size={18} />,
        title: "Personalized Learning",
        desc: "Every interview becomes smarter based on your performance."
      }
    ].map((feature, index) => (

      <motion.div
        key={index}
        whileHover={{
          y: -10,
          scale: 1.02
        }}
        transition={{ duration: .25 }}
        className="rounded-3xl border border-slate-800 bg-zinc-900 p-8 hover:border-cyan-500 transition-all"
      >

        <div className="w-12 h-12 rounded-xl bg-green-500 border border-cyan-500/20 flex items-center justify-center">

          {feature.icon}

        </div>

        <h3 className="text-2xl font-semibold mt-8">
          {feature.title}
        </h3>

        <p className="text-slate-400 mt-5 leading-7">
          {feature.desc}
        </p>

      </motion.div>

    ))}

  </div>

</section>
{/* ================= Testimonials ================= */}

<section className="max-w-7xl mx-auto px-6 pb-28">

  <div className="text-center mb-16">

    <p className="text-cyan-400 uppercase tracking-widest font-semibold">
      Testimonials
    </p>

    <h2 className="text-5xl font-bold mt-4">
      Loved by Students &
      <span className="block text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
        Professionals
      </span>
    </h2>

  </div>

  <div className="grid lg:grid-cols-3 gap-8">

    {[
      {
        name: "Aman Sharma",
        role: "SDE Intern",
        review:
          "The AI interview felt incredibly realistic. The feedback helped me improve my confidence."
      },
      {
        name: "Priya Verma",
        role: "Frontend Developer",
        review:
          "Adaptive questions and detailed reports made my interview preparation much easier."
      },
      {
        name: "Rahul Singh",
        role: "Software Engineer",
        review:
          "A clean interface and insightful analytics. Highly recommended for placement preparation."
      }
    ].map((item, index) => (

      <motion.div
        key={index}
        whileHover={{ y: -8 }}
        className="rounded-3xl border border-slate-800 bg-zinc-900 p-8"
      >

        <div className="flex text-yellow-400 text-xl">
          ★★★★★
        </div>

        <p className="text-slate-300 leading-8 mt-6">
          "{item.review}"
        </p>

        <div className="mt-8">

          <h3 className="font-semibold text-xl">
            {item.name}
          </h3>

          <p className="text-slate-500">
            {item.role}
          </p>

        </div>

      </motion.div>

    ))}

  </div>

</section>

{/* ================= CTA ================= */}

<section className="max-w-6xl mx-auto px-6 pb-24">

  <motion.div
    initial={{ opacity: 0, scale: .9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: .6 }}
    className="rounded-[40px] bg-zinc-500 from-cyan-600 via-blue-600 to-purple-700 p-14 text-center"
  >

    <h2 className="text-5xl font-bold">
      Ready to Crack Your Next Interview?
    </h2>

    <p className="mt-6 text-lg text-slate-100 max-w-2xl mx-auto leading-8">
      Practice with intelligent AI, receive instant feedback,
      and boost your confidence before your dream interview.
    </p>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: .95 }}
      onClick={() => {
        if (!userData) {
          setShowAuth(true);
          return;
        }

        navigate("/interview");
      }}
      className="mt-10 px-10 py-4 rounded-xl bg-white text-slate-900 font-semibold"
    >
      Start Practicing
    </motion.button>

  </motion.div>

</section>

{showAuth && (
  <AuthModel onClose={() => setShowAuth(false)} />
)}

</main>

<Footer />

</div>
  )
}

export default Home;