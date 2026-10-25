import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

function Step3Report({ report }) {
  if (!report) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white selection:bg-emerald-500/30">
        <div className="w-10 h-10 border-3 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-zinc-400 text-sm">Synthesizing Performance Dossier...</p>
      </div>
    );
  }
  const navigate = useNavigate()
  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0
  }))

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Technical Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for Elite Job Offers";
    shortTagline = "Exceptional structured thinking, clarity and technical depth.";
  } else if (finalScore >= 5) {
    performanceText = "Strong Potential • Needs Minor Polish";
    shortTagline = "Good foundation shown; refine conciseness and articulation.";
  } else {
    performanceText = "Foundational Practice Required";
    shortTagline = "Focus on structured reasoning and confident speech delivery.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    let currentY = 25;

    // ================= TITLE =================
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(34, 197, 94);
    doc.text("AI Interview Performance Report", pageWidth / 2, currentY, {
        align: "center",
    });

    currentY += 5;

    // underline
    doc.setDrawColor(34, 197, 94);
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);

    currentY += 15;

    // ================= FINAL SCORE BOX =================
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(
        `Final Score: ${finalScore}/10`,
        pageWidth / 2,
        currentY + 12,
        { align: "center" }
    );

    currentY += 30;

    // ================= SKILLS BOX =================
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");

    doc.setFontSize(12);

    doc.text(`Confidence: ${confidence}`, margin + 10, currentY + 10);
    doc.text(`Communication: ${communication}`, margin + 10, currentY + 18);
    doc.text(`Correctness: ${correctness}`, margin + 10, currentY + 26);

    currentY += 45;

    // ================= ADVICE =================
    let advice = "";

    if (finalScore >= 8) {
        advice =
        "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
    } else if (finalScore >= 5) {
        advice =
        "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
    } else {
        advice =
        "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220);
    doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);

    doc.setFont("helvetica", "bold");
    doc.text("Professional Advice", margin + 10, currentY + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
    doc.text(splitAdvice, margin + 10, currentY + 20);

    currentY += 50;

    // ================= QUESTION TABLE =================
    autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    head: [["#", "Question", "Score", "Feedback"]],
    body: questionWiseScore.map((q, i) => [
        `${i + 1}`,
        q.question,
        `${q.score}/10`,
        q.feedback,
    ]),
    styles: {
        fontSize: 9,
        cellPadding: 5,
        valign: "top",
    },
    headStyles: {
        fillColor: [34, 197, 94],
        textColor: 255,
        halign: "center",
    },
    columnStyles: {
        0: { cellWidth: 10, halign: "center" }, // index
        1: { cellWidth: 55 }, // question
        2: { cellWidth: 20, halign: "center" }, // score
        3: { cellWidth: "auto" }, // feedback
    },
    alternateRowStyles: {
        fillColor: [249, 250, 251],
    },
    });

    doc.save("AI_Interview_Report.pdf");
  };

  return (
    <div className='min-h-screen bg-zinc-950 text-white px-4 sm:px-6 lg:px-12 py-10 relative overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-200'>
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Header Bar */}
        <div className='mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pb-6 border-b border-white/10'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => navigate("/history")}
              className='p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all shadow-md cursor-pointer'
              title="Return to History"
            >
              <FaArrowLeft size={16} />
            </button>

            <div>
              <div className='flex items-center gap-2'>
                <span className='text-xs font-semibold uppercase tracking-wider text-emerald-400'>
                  Evaluation Complete
                </span>
                <span className='w-1.5 h-1.5 rounded-full bg-emerald-400'></span>
                <span className='text-xs text-zinc-400 font-mono'>100% Analyzed</span>
              </div>
              <h1 className='text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-0.5'>
                Performance Analytics Dossier
              </h1>
            </div>
          </div>

          <motion.button
            onClick={downloadPDF}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all text-sm sm:text-base whitespace-nowrap cursor-pointer flex items-center justify-center gap-2'
          >
            <span>Download Official PDF</span>
          </motion.button>
        </div>

        {/* Dashboard Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8'>
          
          {/* Left Column (Overall Score + Skill Breakdown) */}
          <div className='lg:col-span-4 space-y-6'>
            {/* Overall Performance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900/85 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 text-center shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-6">
                Overall Candidate Rating
              </p>

              <div className='relative w-28 h-28 sm:w-32 sm:h-32 mx-auto'>
                <CircularProgressbar
                  value={percentage}
                  text={`${score}/10`}
                  styles={buildStyles({
                    textSize: "20px",
                    pathColor: score >= 7 ? "#10b981" : score >= 5 ? "#f59e0b" : "#f43f5e",
                    textColor: "#ffffff",
                    trailColor: "rgba(255, 255, 255, 0.08)",
                  })}
                />
              </div>

              <div className="mt-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${
                  score >= 7 ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
                  score >= 5 ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' :
                  'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                }`}>
                  {performanceText}
                </span>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1 leading-relaxed">
                  {shortTagline}
                </p>
              </div>
            </motion.div>

            {/* Skill Evaluation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className='bg-zinc-900/85 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl'
            >
              <h3 className="text-base sm:text-lg font-bold text-white mb-6">
                Skill Dimension Breakdown
              </h3>

              <div className='space-y-5'>
                {skills.map((s, i) => (
                  <div key={i}>
                    <div className='flex justify-between mb-1.5 text-xs sm:text-sm font-medium'>
                      <span className='text-zinc-300'>{s.label}</span>
                      <span className='font-mono font-bold text-emerald-400'>{s.value}/10</span>
                    </div>

                    <div className='bg-zinc-800 h-2.5 rounded-full overflow-hidden'>
                      <div
                        className='bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000'
                        style={{ width: `${s.value * 10}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column (Trend Chart + Question Breakdown) */}
          <div className='lg:col-span-8 space-y-6'>
            {/* Performance Trend Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className='bg-zinc-900/85 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl'
            >
              <div className='flex justify-between items-center mb-6'>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Performance Trajectory
                  </h3>
                  <p className='text-xs text-zinc-400'>Question-by-question scoring trend</p>
                </div>
                <span className='text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20'>
                  Peak: {Math.max(...questionScoreData.map(d => d.score), 0)}/10
                </span>
              </div>

              <div className='h-64 sm:h-72'>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={questionScoreData}>
                    <defs>
                      <linearGradient id="scoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} />
                    <YAxis domain={[0, 10]} stroke="#71717a" fontSize={12} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#18181b',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: '#fff',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#10b981"
                      fill="url(#scoreAreaGradient)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Question Breakdown List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='bg-zinc-900/85 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl'
            >
              <h3 className="text-base sm:text-lg font-bold text-white mb-6">
                Question-by-Question Evaluation
              </h3>

              <div className='space-y-4'>
                {questionWiseScore.map((q, i) => (
                  <div
                    key={i}
                    className='bg-white/5 p-5 sm:p-6 rounded-2xl border border-white/5 hover:border-white/15 transition-all space-y-3'
                  >
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3'>
                      <div>
                        <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                          Question {i + 1}
                        </span>
                        <p className="font-semibold text-white text-sm sm:text-base leading-relaxed mt-0.5">
                          {q.question || "Question prompt"}
                        </p>
                      </div>

                      <div className={`px-3 py-1 rounded-full font-mono font-bold text-xs sm:text-sm w-fit whitespace-nowrap ${
                        (q.score ?? 0) >= 8
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : (q.score ?? 0) >= 5
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}>
                        {q.score ?? 0}/10
                      </div>
                    </div>

                    <div className='bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl'>
                      <p className='text-[11px] text-emerald-400 font-bold uppercase tracking-wider mb-1'>
                        AI Feedback & Assessment
                      </p>
                      <p className='text-xs sm:text-sm text-zinc-300 leading-relaxed'>
                        {q.feedback && q.feedback.trim() !== ""
                          ? q.feedback
                          : "No feedback recorded for this question."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step3Report
