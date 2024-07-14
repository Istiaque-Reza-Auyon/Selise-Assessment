import React, { useEffect, useState } from 'react';

function VehicleDataForm({setLocalData, setCounter}) {
  const [vehicleTypes, setVehicleTypes] = useState(['Microbus', 'Car', 'Truck']);
  const [selectedType, setSelectedType] = useState(vehicleTypes[0]); // Default to the first vehicle type
  const [selectedStatus, setSelectedStatus] = useState(vehicleTypes[0]);
  const [status, setStatus] = useState(['In', 'Out']);
  const [startTime, setStartTime] = useState('');
 

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.carStartTime = startTime;
    setLocalData(prevData => {
      const newData = [...prevData, data];
      localStorage.setItem('vehicles', JSON.stringify(newData));
      return newData;
    });
    setCounter(prev => prev + 1);
  };


  

  return (
    <>
    <div className='w-[30vw] mr-6 border-black border-2 p-2 rounded-lg ml-[2vw] mt-[2vw] bg-white'>
        <div className='flex justify-center'>
        <h1 className='text-black text-xl mb-6'>Parking Entry</h1>
        </div>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input
          className='p-2 pl-6 h-[4vh] rounded-[0.5vw] mb-2 bg-transparent border-2 text-black'
          name="licenseNumber"
          placeholder='Enter license number'
          required
        />
        <label className='text-sm mb-2  text-[rgb(233,186,0)]'>Select a Vehicle Type
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="flex justify-center items-center rounded-lg  max-w-[100%] bg-[rgb(16,17,19)] text-sm text-[rgb(230,232,239)] hover:text-[rgb(0,204,255)]"
            name="vehicleType"
          >
            {vehicleTypes.map((option) => (
              <option
                value={option}
                key={option}
                className='bg-[rgb(16,17,19)] text-[rgb(230,232,239)]'
              >
                {option}
              </option>
            ))}
          </select>
        </label>
        <input
          className='p-2 pl-6 h-[4vh] rounded-[0.5vw] mb-2 bg-transparent border-2 text-black'
          name="ownerName"
          placeholder='Enter owner name'
          required
        />
         <input
          className='p-2 pl-6 h-[4vh] rounded-[0.5vw] mb-2 bg-transparent border-2 text-black'
          name="ownerPhone"
          placeholder='Enter owner phone number'
          required
        />
        <label className='text-sm p-2 mb-2 text-[rgb(233,186,0)]'>Select Status
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="flex justify-center items-center rounded-lg max-w-[100%] bg-[rgb(16,17,19)] text-sm text-[rgb(230,232,239)] hover:text-[rgb(0,204,255)]"
            name="status"
          >
            {status.map((option) => (
              <option
                value={option}
                key={option}
                className='bg-[rgb(16,17,19)] text-[rgb(230,232,239)]'
              >
                {option}
              </option>
            ))}
          </select>
        </label>
        <input
          className='p-2 pl-6 h-[4vh] rounded-[0.5vw] mb-2 bg-transparent border-2 text-black'
          name="ownerAddress"
          placeholder='Enter owner address'
          required
        />
        <input
          className='p-2 pl-6 h-[4vh] rounded-[0.5vw] mb-2 bg-transparent border-2 text-black'
          name="carStartTime"
          placeholder='Enter entry time'
          onFocus={(e) => (e.target.type = "datetime-local")} onBlur={(e) => (e.target.type = "text")} value={startTime} onChange={(e) => setStartTime( e.target.value )}
          required
        />
        <button type="submit" className='flex justify-center items-center p-2 bg-[rgb(233,186,0)] text-black mt-5 rounded-[50px]'>Enter</button>
      </form>
      </div>
    </>
  );
}

export default VehicleDataForm;
