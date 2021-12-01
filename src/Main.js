import React, { useState } from 'react'


export default function Main(props) {

    // console.log(props);

    const [state, setState] = useState({
        baseUrl: "https://openweathermap.org/img/wn/",
    })
    const children = props
    const forecast = children.forecast

    const format = () => {
        let options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        return new Date().toLocaleDateString([], options)
    }

    return (
        <div>
            <h1 className="location">{forecast.city}</h1>
            <h2 className="date">{format()}</h2>

            <div className="weatherIcon">
                <div className="sunny">
                    <img src={state.baseUrl + forecast.icon + "@2x.png"} alt="icon" />
                </div>
            </div>
            <p className="temp">{(forecast.temp - 273.15).toFixed(0)}</p>
            <p className="conditions">{forecast.description}</p>
        </div>
    )
}
