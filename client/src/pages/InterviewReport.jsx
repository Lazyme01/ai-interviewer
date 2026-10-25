import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App';
import Step3Report from '../components/Step3Report';
function InterviewReport() {
  const {id} = useParams()
  const [report,setReport] = useState(null);
   
  useEffect(()=>{
    const fetchReport = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/interview/report/" + id , {withCredentials:true})

        console.log(result.data)
        setReport(result.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchReport()
  },[])


  if (!report) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white selection:bg-emerald-500/30">
        <div className="w-10 h-10 border-3 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-zinc-400 text-sm">Loading Interview Report...</p>
      </div>
    );
  }

  return <Step3Report report={report} />
}

export default InterviewReport
