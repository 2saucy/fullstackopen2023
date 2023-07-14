import axios from 'axios'
import {useState, useEffect} from 'react'
import Search from './components/Search'
import Display from './components/Display'


function App() {

  const [countries, setCountries]  = useState([])
  const [filter, setFilter] = useState("")

  useEffect(()=>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const { data } = response
        setCountries(data)
      })
  },[])

  return (
    <div className="App">
        <Search filter={filter} setFilter={setFilter} />
        {
          filter ? (
            <Display countries={countries} filter={filter}/>
          ) : (
            <div></div>
          )
        }
  
    </div>
  );
}

export default App;
