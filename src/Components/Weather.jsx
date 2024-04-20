import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import './Weather.css'
import Clear from '../assets/clear.png'
import Clouds from '../assets/clouds.png'
import Drizzle from '../assets/drizzle.png'
import Humidity from '../assets/humidity.png'
import Mist from '../assets/mist.png'
import Rain1 from '../assets/rain1.png'
import Snow from '../assets/snow.png'
import wind from '../assets/wind.png'
import Loading from '../Components/Loading/Loading';
import cloudImg from '../assets/cloudsImg.png'
import drizzleImg from '../assets/drizzleImg.png'
import mistImg from '../assets/mistImg.png'
import snowImg from '../assets/snowImg.png'
import clearImg from '../assets/clearImg.png'
import rainImg from '../assets/rain.png'
const Weather = () => {

    const imgBackground = useRef(null)
    const [input,setInput] =useState('')
    const [value,setValue] = useState('london')
    const [apiData,setApiData] =useState('')
    const [error, setError] = useState(false);
    const [StatusWeather,setStatusWeather] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const imgSet = useRef(null)
 
    const handleOnchange = (e)=>{
        setInput(e.target.value)
    }
    const handleClick=()=>{
        setValue(input) 
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${'a72938bb5d94274609b07c1ed1690e24'}`
    const fetchData = async () => {
        setIsLoading(true);
        if (!value) {
            setIsLoading(false)
            setError(true); // Đặt lỗi nếu không có giá trị
            return;
        }
    
        await fetch(apiUrl)
            .then(res => {
                if (!res.ok) { 
                    throw new Error('Bad response from server'); // Ném một lỗi
                }
                return res.json(); 
            })
            .then(data => {
                setApiData(data);
                setError(false); 
                setStatusWeather(data.weather[0].main)
                setIsLoading(false)
            })
            .catch(error => {
                setError(true);
                setIsLoading(false)
            });
    }
    useEffect(()=>{
        fetchData()
  
        
    },[value])
    useEffect(() => {
        if (apiData) {
            if (apiData.weather[0].main === 'Clouds') {
                imgSet.current.src = Clouds;
                console.log(apiData)
            } else if (apiData.weather[0].main === 'Rain') {
                imgSet.current.src = Rain1;
            } else if (apiData.weather[0].main === 'Snow') {
                imgSet.current.src = Snow;
            } else if (apiData.weather[0].main === 'Clear') {
                imgSet.current.src = Clear;
            } else if (apiData.weather[0].main === 'Drizzle') {
                imgSet.current.src = Drizzle;
            }else if (apiData.weather[0].main === 'Mist') {
                imgSet.current.src = Mist;
            }
        }
        if(apiData){
            if (apiData.weather[0].main === 'Clouds') {
                imgBackground.current.style.background = 'url(' + cloudImg + ')';
            }else if (apiData.weather[0].main === 'Snow') {
                imgBackground.current.style.background = 'url(' + snowImg + ')';
            }else if (apiData.weather[0].main === 'Clear') {
                imgBackground.current.style.background = 'url(' + clearImg + ')';
            }else if (apiData.weather[0].main === 'Mist') {
                imgBackground.current.style.background = 'url(' + mistImg + ')';
            }else if (apiData.weather[0].main === 'Rain') {
                imgBackground.current.style.background = 'url(' + rainImg + ')';
            }else if (apiData.weather[0].main === 'Drizzle') {
                imgBackground.current.style.background = 'url(' + drizzleImg + ')';
            }
        }
    }, [apiData]);

  return (
    <div ref={imgBackground} className='container-weather'>
    <div className="search">
        <input onChange={(e) => handleOnchange(e)} type="text" placeholder='Search...' />
        <FaSearch onClick={() => handleClick()} className='icon' />
    </div>  
    {error ? ( // Kiểm tra nếu có lỗi thì hiển thị thông báo
        <h2>Invalid country name.</h2>
    ) : (
        <>
            {!isLoading ? (
                <>
                    <img ref={imgSet} src={Snow} alt="" />
                    <h1 className='temperature'>{apiData ? Math.floor((apiData.main.temp - 273.15)) : ''}°C</h1>
                    <h2 className='city'>{apiData ? apiData.name : ''}</h2>
                    <div className="status">
                        <div className="humidity">
                            <img src={Humidity} alt="" />
                            <div className="info">
                                <div>{apiData ? apiData.main.humidity + "%" : ''}</div>
                                <div>humidity</div>
                            </div>
                        </div>
                        <div className="wind">
                            <img src={wind} alt="" />
                            <div className="info">
                                <div>{apiData ? apiData.wind.speed + "m/s" : ""}</div>
                                <div>wind</div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Loading></Loading>
            )}
        </>
    )}
</div>
);
}

export default Weather
