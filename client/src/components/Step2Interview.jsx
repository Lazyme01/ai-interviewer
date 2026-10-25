import React from 'react'
import maleVideo from "../assets/videos/male-ai (2).mp4"
import femaleVideo from "../assets/videos/female-ai.mp4"
import Timer from './Timer'
import { motion } from "motion/react"
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { ServerUrl } from '../App'
import { BsArrowRight } from 'react-icons/bs'

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions, userName } = interviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAIPlaying, setIsAIPlaying] = useState(false);//done

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(
    questions[0]?.timeLimit || 60
  );
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");


  const videoRef = useRef(null);

  const currentQuestion = questions[currentIndex];


  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      // Try known female voices first
      const femaleVoice =
        voices.find(v =>
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("female")
        );

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      // Try known male voices
      const maleVoice =
        voices.find(v =>
          v.name.toLowerCase().includes("david") ||
          v.name.toLowerCase().includes("mark") ||
          v.name.toLowerCase().includes("male")
        );

      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      // Fallback: first voice (assume female)
      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

  }, [])

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;


  /* ---------------- SPEAK FUNCTION ---------------- */
  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      // Add natural pauses after commas and periods
      const humanText = text
        .replace(/,/g, ", ... ")
        .replace(/\./g, ". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);

      utterance.voice = selectedVoice;

      // Human-like pacing
      utterance.rate = 0.92;     // slightly slower than normal
      utterance.pitch = 1.05;    // small warmth
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic()
        videoRef.current?.play();
      };


      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAIPlaying(false);



        if (isMicOn) {
          startMic();
        }
        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };


      setSubtitle(text);

      window.speechSynthesis.speak(utterance);
    });
  };


  useEffect(() => {
    if (!selectedVoice) {
      return;
    }
    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`
        );

        await speakText(
          "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin."
        );

        setIsIntroPhase(false)
      } else if (currentQuestion) {
        await new Promise(r => setTimeout(r, 800));

        // If last question (hard level)
        if (currentIndex === questions.length - 1) {
          await speakText("Alright, this one might be a bit more challenging.");
        }

        await speakText(currentQuestion.question);

        if (isMicOn) {
          startMic();
        }
      }

    }

    runIntro()


  }, [selectedVoice, isIntroPhase, currentIndex])



  useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0;
        }
        return prev - 1

      })
    }, 1000);

    return () => clearInterval(timer)

  }, [isIntroPhase, currentIndex])

  useEffect(() => {
  if (!isIntroPhase && currentQuestion) {
    setTimeLeft(currentQuestion.timeLimit || 60);
  }
}, [currentIndex]);

  //voice to text
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript;

      setAnswer((prev) => prev + " " + transcript);
    };

    recognitionRef.current = recognition;

  }, []);


  const startMic = () => {
    if (recognitionRef.current && !isAIPlaying) {
      try {
        recognitionRef.current.start();
      } catch { }
    }
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };
  const toggleMic = () => {
    if (isMicOn) {
      stopMic();
    } else {
      startMic();
    }
    setIsMicOn(!isMicOn);
  };


  const submitAnswer = async () => {
    if (isSubmitting) return;
    stopMic()
    setIsSubmitting(true)

    try {
      const result = await axios.post(ServerUrl + "/api/interview/submit-answer", {
        interviewId,
        questionIndex: currentIndex,
        answer,
        timeTaken:
          currentQuestion.timeLimit - timeLeft,
      } , {withCredentials:true})

      setFeedback(result.data.feedback)
      speakText(result.data.feedback)
      setIsSubmitting(false)
    } catch (error) {
console.log(error)
setIsSubmitting(false)
    }
  }

  const handleNext =async () => {
    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }

    await speakText("Alright, let's move to the next question.");

    setCurrentIndex(currentIndex + 1);
    setTimeout(() => {
      if (isMicOn) startMic();
    }, 500);

   
  }

  const finishInterview = async () => {
    stopMic()
    setIsMicOn(false)
    try {
      const result = await axios.post(ServerUrl+ "/api/interview/finish" , { interviewId} , {withCredentials:true})

      console.log(result.data)
      onFinish(result.data)
    } catch (error) {
      console.log(error)
    }
  }


   useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;

    if (timeLeft === 0 && !isSubmitting && !feedback) {
      submitAnswer()
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }

      window.speechSynthesis.cancel();
    };
  }, []);







  return (
    <div className='min-h-screen bg-zinc-950 text-white flex items-center justify-center p-3 sm:p-6 relative overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-200'>
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className='w-full max-w-7xl min-h-[85vh] bg-zinc-900/85 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 flex flex-col lg:flex-row overflow-hidden relative z-10'>

        {/* Video / Interviewer Avatar Section */}
        <div className='w-full lg:w-[38%] bg-zinc-900/95 flex flex-col items-center p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-white/10'>
          
          {/* Header pill */}
          <div className='w-full flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
              <span className='text-xs font-bold text-zinc-300 uppercase tracking-wider'>
                AI Interviewer
              </span>
            </div>
            {isAIPlaying ? (
              <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold'>
                <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping'></span>
                Speaking
              </span>
            ) : (
              <span className='inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs'>
                Listening
              </span>
            )}
          </div>

          {/* Video Container */}
          <div className='w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black relative group aspect-video flex items-center justify-center'>
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
            {isAIPlaying && (
              <div className='absolute bottom-3 left-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-emerald-400 font-medium flex items-center gap-1.5'>
                <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse'></span>
                Voice Active
              </div>
            )}
          </div>

          {/* Subtitle / Dialogue Bubble */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-md'
            >
              <p className='text-zinc-200 text-xs sm:text-sm font-medium text-center leading-relaxed italic'>
                "{subtitle}"
              </p>
            </motion.div>
          )}

          {/* Timer & Session Status Card */}
          <div className='w-full max-w-md bg-white/5 border border-white/10 rounded-2xl shadow-xl p-5 sm:p-6 space-y-5 backdrop-blur-md'>
            <div className='flex justify-between items-center text-xs font-medium text-zinc-400'>
              <span>Time Remaining</span>
              <span className='text-zinc-300 font-mono'>
                {currentQuestion?.timeLimit ? `${currentQuestion.timeLimit}s total` : '60s'}
              </span>
            </div>

            <div className='flex justify-center py-1'>
              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} />
            </div>

            <div className="h-px bg-white/10"></div>

            <div className='grid grid-cols-2 gap-4 text-center'>
              <div className='bg-white/5 rounded-xl p-2.5 border border-white/5'>
                <span className='block text-2xl font-black text-emerald-400 font-mono'>
                  {currentIndex + 1}
                </span>
                <span className='text-[11px] text-zinc-400 uppercase tracking-wider'>Current</span>
              </div>

              <div className='bg-white/5 rounded-xl p-2.5 border border-white/5'>
                <span className='block text-2xl font-black text-zinc-300 font-mono'>
                  {questions.length}
                </span>
                <span className='text-[11px] text-zinc-400 uppercase tracking-wider'>Total Questions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Text & Transcription Section */}
        <div className='flex-1 flex flex-col p-6 sm:p-8 md:p-10 relative bg-zinc-900/60 justify-between'>
          <div>
            {/* Top Bar */}
            <div className='flex items-center justify-between mb-6 pb-4 border-b border-white/10'>
              <div className='flex items-center gap-2'>
                <div className='w-2.5 h-2.5 rounded-full bg-emerald-400'></div>
                <h2 className='text-lg sm:text-xl font-bold text-white tracking-tight'>
                  AI Interactive Session
                </h2>
              </div>
              <span className='text-xs text-zinc-400'>
                Candidate: <strong className='text-zinc-200'>{userName || 'Candidate'}</strong>
              </span>
            </div>

            {/* Current Question Prompt */}
            {!isIntroPhase ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className='relative mb-6 bg-white/5 p-5 sm:p-6 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md'
              >
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-xs font-semibold uppercase tracking-wider text-emerald-400'>
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span className='text-xs px-2.5 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/5 font-mono'>
                    {currentQuestion?.difficulty || 'Standard'}
                  </span>
                </div>

                <div className='text-base sm:text-lg font-semibold text-white leading-relaxed'>
                  {currentQuestion?.question}
                </div>
              </motion.div>
            ) : (
              <div className='mb-6 bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl'>
                <p className='text-emerald-300 text-sm font-medium'>
                  Welcome! The interviewer is delivering instructions. Your first question will begin shortly.
                </p>
              </div>
            )}

            {/* Response Input */}
            <div>
              <div className='flex justify-between items-center mb-2'>
                <label className='text-xs font-semibold uppercase tracking-wider text-zinc-400'>
                  Your Response (Speak via Mic or Type)
                </label>
                <span className='text-xs text-zinc-500 font-mono'>
                  {answer.trim().split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                placeholder="Speak into your microphone or type your response here..."
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
                rows={7}
                className="w-full bg-zinc-800/80 p-5 sm:p-6 rounded-2xl resize-none outline-none border border-white/10 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-white placeholder-zinc-500 text-sm sm:text-base leading-relaxed"
              />
            </div>
          </div>

          {/* Action Controls or Feedback */}
          {!feedback ? (
            <div className='flex items-center gap-4 mt-6 pt-4 border-t border-white/10'>
              <motion.button
                onClick={toggleMic}
                whileTap={{ scale: 0.92 }}
                title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
                className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl transition-all shadow-lg cursor-pointer ${
                  isMicOn
                    ? 'bg-gradient-to-tr from-emerald-500 to-teal-500 text-zinc-950 shadow-emerald-500/30'
                    : 'bg-zinc-800 text-rose-400 border border-rose-500/30 shadow-black/50'
                }`}
              >
                {isMicOn ? <FaMicrophone size={22} /> : <FaMicrophoneSlash size={22} />}
              </motion.button>

              <motion.button
                onClick={submitAnswer}
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className='flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all text-sm sm:text-base disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer'
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>Evaluating Response...</span>
                  </>
                ) : (
                  <span>Submit Answer</span>
                )}
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className='mt-6 bg-emerald-500/10 border border-emerald-500/30 p-5 sm:p-6 rounded-2xl shadow-xl space-y-4'
            >
              <div>
                <p className='text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5'>
                  <span className='w-2 h-2 rounded-full bg-emerald-400'></span>
                  AI Real-Time Feedback
                </p>
                <p className='text-emerald-200 text-sm sm:text-base leading-relaxed'>
                  {feedback}
                </p>
              </div>

              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className='w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer'
              >
                <span>Proceed to Next Question</span>
                <BsArrowRight size={18} />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Step2Interview
