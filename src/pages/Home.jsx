import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import VehicleDataForm from '../components/VehicleDataForm';
import DataTable from '../components/DataTable';
import Dashboard from '../components/DashBoard';




function Home() {
    const router = useNavigate();
    const [localData, setLocalData] = useState([]);
    const [counter, setCounter] = useState(0);
    const [exitTime, setExitTime] = useState('');


    useEffect(() => {
        const storedData = localStorage.getItem('vehicles');
        if (storedData) {
          setLocalData(JSON.parse(storedData));
        }
      }, [counter]);

    console.log(localData);

    const handleClick = () => {
        router('/blogs');
    }

    return (
        <div className='bg-[#96958a]'>
        <div className='flex justify-center text-2xl'>
            <h1 className='bg-black text-yellow-500 p-4 border-2 rounded-lg'>Parking Management App</h1>
        </div>
        <div className='flex justify-evenly'>
        <VehicleDataForm setLocalData={setLocalData} setCounter={setCounter}/>
        <Dashboard vehicles={localData}/>
        </div>
        <DataTable vehicles={localData} setLocalData={setLocalData} exitTime={exitTime} setExitTime={setExitTime}/>
        </div>
    )
}

export default Home
