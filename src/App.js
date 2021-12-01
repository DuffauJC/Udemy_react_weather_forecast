import { useState, useEffect } from 'react';
import './App.css';
import Main from './Main';



function App() {

  const [state, setState] = useState({
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather?',
    APIkey: 'd3c8196fb34661b59e17c332adeac28d',
    query: 'Toulouse',
    foreCast: {}
  })

  //https://api.openweathermap.org/data/2.5/weather?q=Toulouse&appid=d3c8196fb34661b59e17c332adeac28d

  const query = () => {

    let url = state.baseUrl + "q=" + state.query + "&appid=" + state.APIkey
    // console.log("url", url)
    console.log("query", state.query)

    fetch(url)
      .then(response => {
        if (response.ok) {
          console.log("success !!!");
          return response.json()
        }
      })
      .then(data => {
        console.log(data)
        let weather = data.weather[0]
        let description = weather.description
        let main = data.main
        let temp = main.temp

        let icon = weather.icon
        let sys = data.sys
        let contryCode = sys.country.toLowerCase()
        let city = data.name

        let forecast = {
          temp: temp,
          description: description,
          icon: icon,
          code: contryCode,
          city:city
        }

        setState({
          ...state, foreCast: forecast,
          query: '',
        })
        console.log(forecast)
      })
  }

  useEffect(() => {
   query()
  }, [])



  return (
    <div>
      <div id="current" className="wrapper">
        <nav className=" navbar-fixed-top">
          <div className="container margin-left" >
            <form className="card my-6" onSubmit={(e) => {
              e.preventDefault()
              query()
            }}>
              <div className="card-body row no-gutters align-items-center">

                <div className="col">
                  <input className="form-control form-control-lg form-control-borderless" type="search"
                    placeholder="Search ..." defaultValue={state.query} onChange={(e) => {
                      e.preventDefault()
                      setState({ ...state, query: e.target.value })
                    }} />
                </div>
              </div>
            </form>

          </div>
        </nav>
      </div>

      <Main forecast={state.foreCast} />


      <footer className="footer">
        <div className="container">
          <p>Weather Data from <a href="https://openweathermap.org">Openweathermap.org</a></p>
        </div>

      </footer>
    </div>
  );
}

export default App;
