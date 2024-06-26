
import './App.css';
import { useState, useEffect } from 'react';
import Weather from './components/Weather';
import { Dimmer, Loader } from 'semantic-ui-react';

function App() {
  const[lat, setLat] = useState([]);
  const[long, setLong] = useState([]);

  useEffect(() => {
    const fetchData = async () =>{
    navigator.geolocation.getCurrentPosition(function(position){
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    // console.log(`Latitude is: ${lat}`);
    // console.log(`longitude is: ${long}`);

    await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
    fetchData();
  }, [lat, long]);

  const[data, setData] = useState([]);
  return (
    <div className="App">
    {(typeof data.main != 'undefined') ? (
      <Weather weatherData={data}/>
    ): (
      <div>
         <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
      </div>
    )}
    
  </div>
  );
}

export default App;
