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
  BsArrowRight,
  BsClockHistory,
  BsCheck2Circle,
} from "react-icons/bs";

import { HiSparkles } from "react-icons/hi";
import { FaUserGraduate } from "react-icons/fa";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-96 sm:w-[500px] h-96 sm:h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-0"></div>
      <div className="absolute top-40 right-10 w-80 sm:w-[450px] h-80 sm:h-[450px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-0"></div>
      <div className="absolute top-[800px] left-1/2 -translate-x-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-teal-500/5 rounded-full blur-[160px] pointer-events-none -z-0"></div>

      <Navbar />

      <main className="flex-1 relative z-10">
        {/* ================= HERO SECTION ================= */}
        <section className="max-w-7xl mx-auto px-6 pt-12 pb-24 lg:pt-16 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs sm:text-sm font-medium shadow-sm shadow-emerald-500/10"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <HiSparkles size={15} className="text-emerald-400" />
                Next-Gen AI Interview Intelligence
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mt-6"
              >
                Ace Your Next
                <span className="block mt-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Interview With AI
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-zinc-400 mt-6 text-base sm:text-lg leading-relaxed max-w-xl"
              >
                Simulate high-stakes technical & HR interviews with realistic voice AI avatars.
                Upload your resume, receive immediate speech analytics, and get structured score dossiers to secure top offers.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    if (!userData) {
                      setShowAuth(true);
                      return;
                    }
                    navigate("/interview");
                  }}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-emerald-500/25 flex items-center gap-2 group transition-all"
                >
                  <span>Start Interview</span>
                  <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    if (!userData) {
                      setShowAuth(true);
                      return;
                    }
                    navigate("/history");
                  }}
                  className="px-7 py-3.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 font-medium transition-all flex items-center gap-2"
                >
                  <BsClockHistory size={16} className="text-zinc-400" />
                  <span>View History</span>
                </motion.button>
              </motion.div>

              {/* Trust highlights */}
              <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-white/5 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <BsCheck2Circle className="text-emerald-400" size={16} />
                  <span>Interactive Voice AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <BsCheck2Circle className="text-emerald-400" size={16} />
                  <span>Resume-Tailored Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <BsCheck2Circle className="text-emerald-400" size={16} />
                  <span>Downloadable PDF Dossier</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - HUD CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative">
                {/* Glow behind card */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-2xl -z-10"></div>

                <div className="bg-zinc-900/85 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
                  {/* Card Header */}
                  <div className="flex justify-between items-start gap-4 pb-6 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        Active Simulation
                      </div>
                      <h3 className="text-2xl font-bold text-white mt-1">
                        Senior Software Engineer
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Technical Round • System Architecture
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Live AI
                    </span>
                  </div>

                  {/* Telemetry Progress Bars */}
                  <div className="space-y-5 my-6">
                    {[
                      {
                        title: "Communication Clarity",
                        value: "94%",
                        width: "94%",
                        gradient: "from-emerald-400 to-teal-400",
                      },
                      {
                        title: "Technical Depth",
                        value: "91%",
                        width: "91%",
                        gradient: "from-teal-400 to-cyan-400",
                      },
                      {
                        title: "Executive Confidence",
                        value: "88%",
                        width: "88%",
                        gradient: "from-cyan-400 to-indigo-400",
                      },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-xs sm:text-sm font-medium mb-1.5">
                          <span className="text-zinc-300">{item.title}</span>
                          <span className="text-emerald-400 font-semibold font-mono">{item.value}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${item.gradient} transition-all duration-1000`}
                            style={{ width: item.width }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom HUD metrics */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-center">
                    <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                      <p className="text-[11px] text-zinc-400">AI Speech Synthesis</p>
                      <p className="text-sm font-bold text-white mt-0.5">Ultra-Natural</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                      <p className="text-[11px] text-zinc-400">Feedback Latency</p>
                      <p className="text-sm font-bold text-emerald-400 mt-0.5">&lt; 300 ms</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= STATISTICS ================= */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {[
              { number: "15,000+", title: "Mock Interviews Completed" },
              { number: "500+", title: "Curated Job Roles" },
              { number: "96%", title: "Offer Acceptance Rate" },
              { number: "24/7", title: "Real-Time AI Evaluator" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-center transition-all duration-300 shadow-xl group"
              >
                <h3 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  {item.number}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm font-medium mt-3">
                  {item.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="max-w-7xl mx-auto px-6 pb-28">
          <div className="text-center mb-16">
            <span className="text-emerald-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
              Streamlined Process
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">
              How InterviewIQ Works
            </h2>
            <p className="text-zinc-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
              A frictionless four-step pathway from your resume to confident, polished interview execution.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: <BsRobot size={22} />,
                title: "Choose Role",
                desc: "Specify your target role, years of experience, and optional resume for custom questions.",
              },
              {
                step: "02",
                icon: <BsMic size={22} />,
                title: "Voice Interview",
                desc: "Engage in an audio-visual interview with intelligent conversational voice synthesis.",
              },
              {
                step: "03",
                icon: <BsClock size={22} />,
                title: "Real-Time Analysis",
                desc: "Receive immediate per-question critique, identifying gaps and refining responses.",
              },
              {
                step: "04",
                icon: <BsBarChart size={22} />,
                title: "Performance Dossier",
                desc: "Review comprehensive charts, skill metrics, and export professional PDF reports.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="relative rounded-3xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl group"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-2xl font-black text-zinc-700 group-hover:text-emerald-400/40 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="max-w-7xl mx-auto px-6 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-emerald-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
              Capabilities
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">
              Engineered For
              <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Interview Mastery
              </span>
            </h2>

            <p className="text-zinc-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Every tool and intelligence layer designed to eliminate surprises, calm anxiety, and showcase your true capability.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <BsRobot size={20} />,
                title: "Adaptive AI Avatars",
                desc: "Realistic video avatars with expressive cadence that simulate actual hiring managers.",
              },
              {
                icon: <BsMic size={20} />,
                title: "Speech & Audio Recognition",
                desc: "Accurate real-time speech-to-text transcript generation with natural pause recognition.",
              },
              {
                icon: <BsBarChart size={20} />,
                title: "Quantitative Analytics",
                desc: "Multi-dimensional scoring spanning confidence, technical correctness, and articulation.",
              },
              {
                icon: <BsClock size={20} />,
                title: "Paced Timers",
                desc: "Simulate pressure with custom time limits per question just like elite FAANG interviews.",
              },
              {
                icon: <BsFileEarmarkText size={20} />,
                title: "Resume Analysis",
                desc: "Upload PDF resumes to extract actual projects and technologies for bespoke questions.",
              },
              {
                icon: <HiSparkles size={20} />,
                title: "Comprehensive PDF Export",
                desc: "Save and print executive performance dossiers to track interview progress over time.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="rounded-3xl border border-white/10 hover:border-emerald-500/40 bg-zinc-900/60 backdrop-blur-xl p-7 sm:p-8 transition-all duration-300 shadow-xl group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/15 to-teal-500/15 border border-emerald-500/25 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mt-6 group-hover:text-emerald-300 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="max-w-7xl mx-auto px-6 pb-28">
          <div className="text-center mb-16">
            <span className="text-emerald-400 uppercase tracking-widest text-xs sm:text-sm font-semibold">
              Success Stories
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">
              Trusted by Top Engineers & Candidates
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                name: "Aman Sharma",
                role: "Software Engineer @ Tier-1 Tech",
                review:
                  "The AI interview felt uncannily realistic. The instant feedback pointed out gaps in my system design explanations that helped me land an offer.",
              },
              {
                name: "Priya Verma",
                role: "Frontend Developer",
                review:
                  "Adaptive questioning and detailed breakdown charts took the fear out of technical rounds. I went in completely calm and prepared.",
              },
              {
                name: "Rahul Singh",
                role: "Backend Engineer",
                review:
                  "The resume parsing gave me hyper-relevant questions on my actual past projects. Hands down the highest quality preparation tool.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-white/10 hover:border-white/20 bg-zinc-900/60 backdrop-blur-xl p-8 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex text-amber-400 text-sm tracking-widest">
                    ★★★★★
                  </div>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mt-5 italic">
                    "{item.review}"
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-white/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-zinc-950 font-bold flex items-center justify-center text-sm shadow-md">
                    {item.name.slice(0, 1)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-white">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= CTA BANNER ================= */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[36px] bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-10 sm:p-14 lg:p-16 text-center relative overflow-hidden shadow-2xl shadow-emerald-950/60 border border-emerald-400/25"
          >
            {/* Ambient pattern */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-sm mb-4">
                <HiSparkles size={14} /> Ready for Breakthrough?
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Crack Your Next Dream Offer Today
              </h2>

              <p className="mt-5 text-base sm:text-lg text-emerald-50/90 leading-relaxed">
                Step into realistic simulations, eliminate interview anxiety, and see exactly where you stand with AI-backed precision.
              </p>

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
                className="mt-8 px-9 py-4 rounded-full bg-white text-zinc-950 font-bold text-sm sm:text-base shadow-2xl hover:bg-zinc-100 transition-all"
              >
                Start Practicing Free
              </motion.button>
            </div>
          </motion.div>
        </section>

        {showAuth && (
          <AuthModel onClose={() => setShowAuth(false)} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Home;