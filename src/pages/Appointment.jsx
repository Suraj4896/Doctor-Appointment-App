import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

// this component is used to show doctors appointment details
const Appointment = () => {

  // get the doc id from param route
  const { docId } = useParams();
  // get doctors
  const { doctors, currencySymbol } = useContext(AppContext);
  // days
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  // state for storing doctors info
  const [docInfo, setDocInfo] = useState(null)
  // state for doctor's slot
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  // get the doctor details
  const fetchDoctorInfo = async () => {
    const doctorInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(doctorInfo);
  }

  // logic for calculate slot time
  const getAvailableSlots = async () => {
    setDocSlots([]);
    // getting current date
    let today = new Date();
    // getting next 7 days
    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currDate = new Date(today);
      currDate.setDate(today.getDate() + i);

      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // setting hours
      if (currDate.getDate() === today.getDate()) {
        // set time according to current time
        currDate.setHours(currDate.getHours() > 10 ? currDate.getHours() + 1 : 10);
        currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currDate.setHours(10);
        currDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currDate < endTime) {
        let formattedTime = currDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        // add slots to array
        timeSlots.push({
          datetime: new Date(currDate),
          time: formattedTime,
        })
        // increment time by 30 mins
        currDate.setMinutes(currDate.getMinutes() + 30);
      }
      setDocSlots(prevSlots => [...prevSlots, timeSlots]);
    }
  }

  // show data after page load
  useEffect(() => {
    fetchDoctorInfo();
  }, [doctors, docId])

  // get the available slots when docInfo changes
  useEffect(() => {
    getAvailableSlots();
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots])

  // show only when doctor available
  return docInfo && (
    <div className="p-4 sm:p-8 bg-gray-50">
      {/* Doctor details */}
      <div className='flex flex-col md:flex-row gap-4'>
        <div className="shadow-lg rounded-lg overflow-hidden">
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 shadow-lg'>
          {/* doc info */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border border-gray-400 text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          {/* doctor about */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span></p>
        </div>
      </div>

      {/* booking slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item, index) => (
              // show slots
              // when click on any slot it sets the index to slot index and change the color
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer transition-shadow ${slotIndex === index ? 'bg-primary text-white shadow-lg' : 'border border-gray-200 hover:shadow-md'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            // show slots time
            // when click on any slot it sets the time to slot time and change the color
            docSlots.length && docSlots[slotIndex].map((item, index) => (
              <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-shadow ${item.time === slotTime ? 'bg-primary text-white shadow-lg' : 'text-gray-400 border border-gray-300 hover:shadow-md'}`} key={index}>
                {item.time.toLowerCase()}
              </p>
            ))
          }
        </div>
        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 transition-transform transform hover:scale-105 shadow-lg'>Book an appointment</button>
      </div>
      {/* listing related doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment
