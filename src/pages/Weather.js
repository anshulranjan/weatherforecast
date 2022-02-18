import React, {useState, useEffect} from "react";
import {TiWeatherSunny, TiWeatherCloudy, TiWeatherDownpour, TiWeatherStormy} from 'react-icons/ti';
import { getWeatherForCity, getWeatherForecast, getDailyForecast } from "./api";
const Weather = () =>{
    const [name, setName] = useState("London");
    const [result, setResult] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [daily, setDaily] = useState([]);
    const [value, setValue] = useState("today");
    var daysname = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];


    const [wait, setWait] = useState(true);
    var key = "048c43a2f7e00f37c3b4044df2ec3128"
    var today = new Date();
    var todaydate = new Date()
    var monthname = today.toLocaleString('default', { month: 'short' })
    var dd = String(today.getDate()).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = monthname + '-' + dd + '-' + yyyy;
    var count = (todaydate.getDay())%7
    var count1 = (todaydate.getDay())%7
    var count2 = (todaydate.getDay() -1)%7

    useEffect(() => {
        loadWeather();
    }, []);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setWait(true);
        loadWeather();

    }
    const loadWeather = () => {
        getWeatherForCity(key,name)
        .then(c => {
            setResult(c.data)
            setWait(false)
        })
        .catch(err => console.log(err));
        getDailyForecast(key,name)
        .then(c => {
            setDaily(c.data.list)
            setWait(false)
        })
        .catch(err => console.log(err));
        getWeatherForecast(key,name)
        .then(c=>{
            setForecast(c.data.list);
        })
        .catch(err => console.log(err));
        
    }
    
    const changeValue = (e, val) => {
        e.preventDefault()
        setValue(val);
    }
    
    return(
        <div class="container-fluid px-1 px-sm-3 py-5 mx-auto">
        <div class="row d-flex justify-content-center">
            <div class="row card0">
                <div class="card1 col-lg-4 col-md-5"> <small>{today}</small>
                    
                    <div class="row mt-5">
                        <h1 class="large-font mr-3">{!wait && result.main.temp}&#176;</h1>
                    </div>   
                    <h5 class="mt-1">{!wait &&  result.name}</h5> 
                    <h5 class="mt-1">{!wait &&  result.sys.country}</h5>
                    
                </div>
                <div class="card2 col-lg-8 col-md-7">
                    <form onSubmit={handleSubmit}>
                    <div class="row px-3"> <input type="text" name="weather" value={name} onChange={e => setName(e.target.value)} placeholder="Search the location" class="mb-5"></input>
                    <button type="submit" class="btn btn-dark">Search</button>
                    </div>
                    </form>
                    <div className="mr-5">
                    <div className="row" style={{color:"black"}}>
                        {forecast.slice(1, 7).map((weather, i) => {
                            count = (count + 1)%7
                            return (
                            <div classname="col-4" key={i}>
                                {weather.weather[0]["main"] === "Rain" && (<TiWeatherDownpour className="mr-4" style={{color:"red"}} size={100}/>)}
                                {weather.weather[0]["main"] === "Clouds" && (<TiWeatherCloudy className="mr-4" style={{color:"red"}} size={100}/>)}
                                {weather.weather[0]["main"] === "Clear" && (<TiWeatherSunny className="mr-4" style={{color:"red"}} size={100}/>)}
                                {weather.weather[0]["main"] === "Storm" && (<TiWeatherStormy className="mr-4" style={{color:"red"}} size={100}/>)} 
                                < br />
                                {daysname[count]}
                                
                        </div>
                            
                    )})}
                    </div>
                    
                    <div class="row mt-5" style={{"color":"black", backgroundColor:"#F5F5F5"}}>
                        <div class="col-2" style={{"cursor":"pointer"}}><h4 onClick={e=> changeValue(e, "today")} >Today</h4></div>
                        <div class="col-2" style={{"cursor":"pointer"}}><h4 onClick={e=> changeValue(e, "week")}>Week</h4></div>
                        <div class="col-2" style={{"cursor":"pointer"}}><h4 onClick={e=> changeValue(e, "month")}>Month</h4></div>
                    </div>
                        
                        {value === "today" && daily.map((weather,i) => {
                            let timegiven = weather.dt_txt.substring(11,13);
                            let daygiven = weather.dt_txt.substring(8,10);
                            if(daygiven === dd){
                            return(
                            <div className="row mt-5" style={{color:"black"}} key ={i}>
                                <div class="col-6" >
                                    {timegiven} Hours
                                </div>
                                <div class="col">
                                    {weather.weather[0]["main"]}
                                </div>
                                <div class="col">
                                    {weather.main.temp}                            
                                </div>
                            </div>
                        )
                        }})}


                        {value === "week" && forecast.slice(1, 7).map((weather,i) => {
                            count1 = (count1 + 1)%7
                            return(
                            <div className="row mt-5" style={{color:"black"}} key ={i}>
                                <div class="col-6" >
                                    {daysname[count1]}
                                </div>
                                <div class="col">
                                    {weather.weather[0]["main"]}
                                </div>
                                <div class="col">
                                    {weather.temp.max}                            
                                </div>
                            </div>
                        )
                        })}
                        {value === "month" && forecast.map((weather,i) => {
                            count2 = (count2 + 1)%7
                            return(
                            <div className="row mt-5" style={{color:"black"}} key ={i}>
                                <div class="col-6" >
                                    {daysname[count2]}
                                </div>
                                <div class="col">
                                    {weather.weather[0]["main"]}
                                </div>
                                <div class="col">
                                    {weather.temp.max}                            
                                </div>
                            </div>
                        )
                        })}
                        
                        
                        <div class="line mt-3"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Weather;