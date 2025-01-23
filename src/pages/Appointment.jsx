import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

//this component is used to show doctors appointment details
const Appointment = () => {

  //get the doc id from param route
  const {docId} = useParams();
  //get doctors
  const {doctors} = useContext(AppContext);
  //state for storing doctors info
  const [docInfo, setDocInfo] = useState(null)
  //get the doctor details
  const fetchDoctorInfo = async () => {
    const doctorInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(doctorInfo);
    console.log(doctorInfo);
    
  }

  //show data after page load
  useEffect(() => {
    fetchDoctorInfo();
  }, [doctors, docId])
  return (
    <div>
        
    </div>
  )
}

export default Appointment