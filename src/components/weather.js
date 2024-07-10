import {ReactComponent as Ts201} from '../images/201ts.svg';
import {ReactComponent as Ts211} from '../images/211ts.svg';
import {ReactComponent as Ts212} from '../images/212ts.svg';
import {ReactComponent as Dr301} from '../images/301dr.svg';
import {ReactComponent as D300dr} from '../images/d300dr.svg';  
import {ReactComponent as N300dr} from '../images/n300dr.svg';  
import {ReactComponent as D500r} from '../images/d500r.svg';
import {ReactComponent as N500r} from '../images/n500r.svg';
import {ReactComponent as D521r} from '../images/d521r.svg';
import {ReactComponent as N521r} from '../images/n521r.svg';
import {ReactComponent as R501} from '../images/501r.svg';
import {ReactComponent as R502} from '../images/502r.svg';
import {ReactComponent as F701} from '../images/700f.svg';
import {ReactComponent as D800} from '../images/d800.svg';
import {ReactComponent as N800} from '../images/n800.svg';
import {ReactComponent as D802c} from '../images/d802c.svg';
import {ReactComponent as N802c} from '../images/n802c.svg';
import {ReactComponent as D803c} from '../images/d803c.svg';
import {ReactComponent as N803c} from '../images/n803c.svg';
import {ReactComponent as C804} from '../images/d804c.svg';



export default async function Weather(latitude, longitude) {
    const apiKey = "b21786d5d09382d3335fdb0a12d89d7a";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt_br`;
    const switchIcon = (id, sunrise, sunset) => {
      const commonClassName = 'icon'; 
      switch(id) {
        case 800: // tempo limpo
          return dayOrNight(sunrise, sunset) === "night" ? <N800 className={commonClassName} /> : <D800 className={commonClassName} />;
        case 801: // pouquíssimas nuvens
          return dayOrNight(sunrise, sunset) === "night" ? <N800 className={commonClassName} /> : <D800 className={commonClassName} />;
        case 802: // levemente nublado
          return dayOrNight(sunrise, sunset) === "night" ? <N802c className={commonClassName} /> : <D802c className={commonClassName} />;
        case 803: // parcialmente nublado
          return dayOrNight(sunrise, sunset) === "night" ? <N803c className={commonClassName} /> : <D803c className={commonClassName} />;
        case 804: // nublado
          return <C804 className={commonClassName} />;
        case 300: // garoa leve
          return dayOrNight(sunrise, sunset) === "night" ? <N300dr className={commonClassName} /> : <D300dr className={commonClassName} />;
        case (301 <= id && id <= 321): // garoa
          return <Dr301 className={commonClassName} />;
        case (701 <= id && id <= 781): // nevoeiro
          return <F701 className={commonClassName} />;
        case 500: // chuva leve
          return dayOrNight(sunrise, sunset) === "night" ? <N500r className={commonClassName} /> : <D500r className={commonClassName} />;
        case 501: // chuva moderada
          return <R501 className={commonClassName} />;
        case (502 <= id && id <= 511): // chuva forte
          return <R502 className={commonClassName} />;
        case (520 <= id && id <= 531): // aguaceiros
          return dayOrNight(sunrise, sunset) === "night" ? <N521r className={commonClassName} /> : <D521r className={commonClassName} />;
        case (200 <= id && id <= 202): // trovoadas com chuva
          return <Ts201 className={commonClassName} />;
        case (210 <= id && id <= 211): // trovoadas
          return <Ts211 className={commonClassName} />;
        case (212 <= id && id <= 232): // trovoadas
          return <Ts212 className={commonClassName} />;
        default: 
          return dayOrNight(sunrise, sunset) === "night" ? <N800 className={commonClassName} /> : <D800 className={commonClassName} />;
      }
    };

    const dayOrNight = (sunrise, sunset) => {
      const time = new Date().getTime();
      const rise = new Date(sunrise*1000).getTime();
      const set = new Date(sunset*1000).getTime();      
      return (time > rise && time < set) ? "day" : "night";
    };
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      const weather = {
        name: data.name,
        temperature: Math.round(data.main.temp),
        min_temp: Math.round(data.main.temp_min),
        max_temp: Math.round(data.main.temp_max),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: switchIcon(data.weather[0].id,data.sys.sunrise,data.sys.sunset),
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        dayOrNight: dayOrNight(
          data.sys.sunrise, 
          data.sys.sunset)
      };
      console.log("Dados do clima obtidos");
      return weather;

    } catch (error) {
      console.error("Erro ao buscar dados do clima:", error);
      return null
      
    }
} 


