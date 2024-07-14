import React, { useState } from 'react';
import { isoToDateTimeAmPm } from '../assets/utils';

const DataTable = ({ vehicles, setLocalData, exitTime, setExitTime }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    carExitTime: '',
    parkingCharge: '',
    status: ''
  });

  const showModal = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      carExitTime: vehicle.carExitTime || '',
      parkingCharge: vehicle.parkingCharge || '',
      status: vehicle.status || 'in'
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingVehicle(null);
  };

  const handleOk = () => {
    const updatedVehicles = vehicles.map((vehicle) =>
      vehicle.licenseNumber === editingVehicle.licenseNumber ? { ...vehicle, ...formData } : vehicle
    );
    setLocalData(updatedVehicles);
    localStorage.setItem('vehicles', JSON.stringify(updatedVehicles)); // Update localStorage
    setIsModalVisible(false);
    setEditingVehicle(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className='flex flex-col justify-center mt-4 p-4 bg-white border-2 rounded-lg border-black m-4'>
        <div className='flex justify-center'>
        <h1 className='bg-black text-yellow-500 rounded-lg p-4 mb-2'>Parking Data</h1>
        </div>
      <table className='border-2 border-black '>
        <thead>
          <tr>
            <th className='border-black border-2'>License Number</th>
            <th className='border-black border-2'>Vehicle Type</th>
            <th className='border-black border-2'>Owner Name</th>
            <th className='border-black border-2'>Owner Phone</th>
            <th className='border-black border-2'>Status</th>
            <th className='border-black border-2'>Owner Address</th>
            <th className='border-black border-2'>Entry Time</th>
            <th className='border-black border-2'>Exit Time</th>
            <th className='border-black border-2'>Parking Charge</th>
            <th className='border-black border-2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={index}>
              <td className='border-black border-2'>{vehicle.licenseNumber}</td>
              <td className='border-black border-2'>{vehicle.vehicleType}</td>
              <td className='border-black border-2'>{vehicle.ownerName}</td>
              <td className='border-black border-2'>{vehicle.ownerPhone}</td>
              <td className='border-black border-2'>{vehicle.status}</td>
              <td className='border-black border-2'>{vehicle.ownerAddress}</td>
              <td className='border-black border-2'>{isoToDateTimeAmPm(vehicle.carStartTime)}</td>
              <td className='border-black border-2'>{isoToDateTimeAmPm(exitTime)}</td>
              <td className='border-black border-2'>{vehicle.parkingCharge}</td>
              <td className='flex flex-col items-center border-black border-2  text-white '>
                <button className='bg-blue-500 px-4 border-black border-2 rounded-lg' onClick={() => showModal(vehicle)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalVisible && (
        <div className="modal bg-[#96958A] border-2 border-black rounded-lg mt-2">
          <div className="modal-content">
            <div className='flex justify-center m-2'>
            <h2 className='bg-black text-yellow-500 rounded-lg p-4 mb-2'>Edit Vehicle</h2>
            </div>
            <form>
              <label className='bg-yellow-500 p-2 border-2 border-black rounded-lg m-4'>
                Exit Time:
                <input
          className='p-2 pl-6 h-[4vh] rounded-[0.5vw] mb-2 bg-white border-2 text-black mx-2'
          name="carExitTime"
          placeholder='Enter exit time'
          onFocus={(e) => (e.target.type = "datetime-local")} onBlur={(e) => (e.target.type = "text")} value={exitTime} onChange={(e) => setExitTime( e.target.value )}
        />
              </label>
              <label className='bg-yellow-500 p-2 border-2 border-black rounded-lg m-4'>
                Parking Charge:
                <input
                 className='p-2 pl-6 h-[4vh] rounded-[0.5vw] mb-2 bg-white border-2 text-black mx-2'
                  type="text"
                  name="parkingCharge"
                  value={formData.parkingCharge}
                   placeholder='Enter parking charge'
                  onChange={handleChange}
                />
              </label>
              <label className='bg-yellow-500 p-2 border-2 border-black rounded-lg m-4'>
                Status:
                <select
                className='rounded-lg m-2'
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="in">In</option>
                  <option value="out">Out</option>
                </select>
              </label>
            </form>
            <button className='bg-blue-500 p-2 border-2 border-black rounded-lg m-4' onClick={handleOk}>OK</button>
            <button className='bg-blue-500 p-2 border-2 border-black rounded-lg' onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
