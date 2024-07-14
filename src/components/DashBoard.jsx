import { Card, DatePicker } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { dateTimeAmPmToIso } from '../assets/utils';




const Dashboard = ({ vehicles }) => {
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [selectedDate, setSelectedDate] = useState(moment());

    useEffect(() => {

        const formattedDate = selectedDate.format('YYYY-MM-DD');
        const filtered = vehicles.filter((vehicle) => {
            return (
                vehicle.carStartTime.startsWith(formattedDate) ||
                (vehicle.carExitTime && vehicle.carExitTime.startsWith(formattedDate))
            );
        });
        setFilteredVehicles(filtered);
    }, [selectedDate, vehicles]);

    console.log(filteredVehicles)

    const totalCarsParked = filteredVehicles.length;
    const totalSlots = 100; // Assuming total parking slots are 100
    const totalEmptySlots = totalSlots - totalCarsParked;

    const vehicleTypeCount = filteredVehicles.reduce((acc, vehicle) => {
        acc[vehicle.vehicleType] = (acc[vehicle.vehicleType] || 0) + 1;
        return acc;
    }, {});

    const twoHoursAgo = moment().subtract(2, 'hours');
    const longParkedVehicles = filteredVehicles.filter((vehicle) => {
        const entryTime = moment(vehicle.carStartTime);
        return entryTime.isBefore(twoHoursAgo);
    });

    const handleDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    return (
        <div className="dashboard w-[68vw] mr-6 border-black border-2 p-2 rounded-lg ml-[2vw] mt-[2vw] bg-yellow-500">
            <div className='flex justify-center'>
                <h2 className='bg-black text-yellow-500 p-4 border-2 rounded-lg'>Dashboard</h2>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label>Date: </label>
                <DatePicker value={selectedDate} onChange={handleDateChange} />
            </div>

            <div
                className='flex gap-4 flex-wrap justify-center'
            >
                <Card title="Total Cars Parked" className='w-[15vw] bg-white'>
                    <div className='flex justify-center'>
                        <h3 className='text-black'>{totalCarsParked}</h3>
                    </div>
                </Card>

                <Card title="Total Empty Slots" className='w-[15vw]'>
                    <div className='flex justify-center'>
                        <h3>{totalEmptySlots}</h3>
                    </div>
                </Card>

                <Card title="Vehicle Types" className='w-[15vw]'>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {Object.keys(vehicleTypeCount).map((type) => (
                            <li key={type} style={{ marginBottom: '5px' }}>
                                {type}: {vehicleTypeCount[type]}
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card
                    title="Vehicles Parked for More Than Two Hours"
                    className='w-[30vw]'
                >
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {longParkedVehicles.map((vehicle, index) => (
                            <li key={index} style={{ marginBottom: '5px' }}>
                                {vehicle.licenseNumber} - {vehicle.ownerName}
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
