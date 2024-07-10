import React, { useEffect, useState} from 'react';
import Weather from './weather';
import getLocation from './location';
import {ReactComponent as HumiditySvg} from '../images/droplet.svg';
import {ReactComponent as TermoMaxSvg} from '../images/termo-max.svg';
import {ReactComponent as TermoMinSvg} from '../images/termo-min.svg';

const defaultLocation = {
  latitude: -23.6533509,
  longitude: -46.5279039
};
export default function WeatherComponent() {
    const [weather, setWeather] = useState(null);
    const[color, setColor] = useState("#000000");
    const[word,setWord] = useState("#000000");
    const [currentTime, setCurrentTime] = useState(new Date());       
    const [location, setLocation] = useState(defaultLocation);
   

     useEffect(() => {
        const fetchLocation = async () => {
            try {
                console.log("Solicitando localização do usuário...");
                const { latitude, longitude, userAccepted } = await getLocation();
                if (userAccepted) {
                    setLocation({ latitude, longitude });
                } else {
                    console.log("Usuário não aceitou compartilhar a localização. Usando localização padrão.");
                    setLocation(defaultLocation);
                }
            } catch (error) {
                console.error("Erro ao obter localização:", error);
                setLocation(defaultLocation);
            } 
        };

        fetchLocation();
    }, []);
 

   useEffect(() => {
      const fetchWeather = async () => {
        if (location.latitude && location.longitude) {
          const weatherData = await Weather(location.latitude, location.longitude);
          setWeather(weatherData);
          colorChange(weatherData.dayOrNight);
        }
      };
  
      fetchWeather();
    }, [location]);

   

       useEffect(() => {
        document.documentElement.style.setProperty('--background', color);
        document.documentElement.style.setProperty('--color', word);
    }, [color,word]);
    const colorChange = (dayOrNight) => {
        if (dayOrNight === "day") {
            setColor("linear-gradient( #efc977,#e07256)");
            setWord("#171412");
        } else if (dayOrNight === "night"){
            setColor("linear-gradient( #0e1c26,#2a45ab)");
            setWord("#e3dac9");
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval); 
    }, []);
    const formater = (currentTime) => {
        return new Intl.DateTimeFormat('pt-BR', {hour: '2-digit',minute: '2-digit',second: '2-digit'}).format(currentTime);
    };
    const getDay = () => {
      const day = new Date();
      return {
        day: day.getDate(),
        dayOfWeek: day.toLocaleDateString('pt-BR', { weekday: 'long' }),
        month: day.toLocaleDateString('pt-BR', { month: 'long' })
      }
    }

    return (
     <div>
     {weather ? ( 
          <div className='weather-widget'>
            <div className='city'>{weather.name}</div>
            <div className='icon' >{weather.icon}</div>
            <div className='des'> {weather.description}</div>
            <div className='temp'> {weather.temperature}°C</div>
            <div className='temp'>
              <TermoMinSvg className='temp-icon'/>
               <div className='low-temp'>{weather.min_temp}°C</div>  
               <TermoMaxSvg className='temp-icon'/> 
               <div className='high-temp'>{weather.max_temp}°C</div>
            </div>
            <div className='humidity'><HumiditySvg className='humidity-icon'/> {weather.humidity}%</div>
            <div className='time'>{formater(currentTime)}</div>
            <div className='time'>{getDay().dayOfWeek}</div>
            <div className='day'> {getDay().day} de
              <span className='month'> {getDay().month} </span>  
              </div>         
          </div>
        ) : (
          <p>Carregando dados do clima...</p>
        )}
     </div>
    );
  }