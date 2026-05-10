import React from 'react'
import  { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllApointment = () => {

  const {aToken, appointments, getAllAppointments, cancelAppointment} = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if(aToken) {
      getAllAppointments()
    }
  },[aToken])
  return (
   <div className='w-full max-w-6xl m-5'>

  <p className='mb-4 text-xl font-semibold text-gray-700'>
    All Appointments
  </p>

  <div className='bg-white border rounded-xl text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll shadow-sm'>

    {/* Header */}
    <div className='hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_2fr_2.5fr_1fr_1fr] items-center py-4 px-6 border-b bg-gray-50 text-gray-700 font-medium'>

      <p>#</p>
      <p>Patient</p>
      <p>Age</p>
      <p>Date & Time</p>
      <p>Doctor</p>
      <p>Fees</p>
      <p className='text-center'>Action</p>

    </div>

    {/* Rows */}
    {appointments?.map((item, index) => (

      <div
        key={index}
        className='grid grid-cols-1 sm:grid-cols-[0.5fr_2.5fr_1fr_2fr_2.5fr_1fr_1fr]
        items-center gap-4 py-4 px-6 border-b hover:bg-gray-50 text-gray-600'
      >

        {/* Index */}
        <p className='max-sm:hidden'>{index + 1}</p>

        {/* Patient */}
        <div className='flex items-center gap-3'>
          <img
            className='w-9 h-9 rounded-full object-cover'
            src={item.userData.image}
            alt=""
          />
          <p className='font-medium'>{item.userData.name}</p>
        </div>

        {/* Age */}
        <p className='max-sm:hidden'>
          {calculateAge(item.userData.dob)}
        </p>

        {/* Date */}
        <p className='text-sm'>
          {slotDateFormat(item.slotDate)}, {item.slotTime}
        </p>

        {/* Doctor */}
        <div className='flex items-center gap-3'>
          <img
            className='w-9 h-9 rounded-full bg-gray-200 object-cover'
            src={item.docData.image}
            alt=""
          />
          <p>{item.docData.name}</p>
        </div>

        {/* Fees */}
        <p className='font-medium'>
          {currency}{item.amount}
        </p>

        {/* Action */}
        <div className='flex justify-center'>
          {
            item.cancelled
              ? (
                <p className='text-red-500 text-xs font-semibold'>
                  Cancelled
                </p>
              )
              :item.isCompleted
              ? <p className='text-green-500 text-xs font-semibold'>Completed</p>
              : (
                <img onClick={() =>
                  cancelAppointment(item._id)
                }
                  className='w-8 cursor-pointer hover:scale-110 transition-all'
                  src={assets.cancel_icon}
                  alt=""
                />
              )
          }
        </div>

      </div>

    ))}

  </div>

</div>
  )
}

export default AllApointment
