import React, {useEffect, useState} from "react";
import axios from "axios";

function LocationSelector(){
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("")
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("")
    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(()=>{
        axios.get("https://crio-location-selector.onrender.com/countries")
        .then(response => {
            setCountries(response.data);
        })
        .catch(error => {
            console.error("Error fetching countries:", error)
        })
    },[]);

    useEffect(() => {
  if (selectedCountry) {
    axios
      .get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
      .then((response) => {
        console.log("States fetched:", response.data);
        setStates(response.data);
        setSelectedState("");
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
        setStates([]);
      });
  }
}, [selectedCountry]);

useEffect(() => {
  if (selectedCountry && selectedState) {
    axios
      .get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
      .then((response) => {
        console.log("Cities fetched:", response.data);
        setCities(response.data);
        setSelectedCity("");
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
        setCities([]);
      });
  }
}, [selectedCountry, selectedState]);

    return(
        <div style={{ padding: "20px", textAlign: "center"}}>
            <h2>Select Location</h2>
            <select
              value={selectedCountry}
              onChange={(e)=>setSelectedCountry(e.target.value)}>
                <option value="">Select Country</option>
                {countries.map((country,i)=> (
                    <option key={i} value={country}>{country}</option>
                ))}
            </select>
            <br></br>
            <select
             value={selectedState}
             onChange={(e) => setSelectedState(e.target.value)}
             disabled={!selectedCountry}>
                <option value="">Select State</option>
                {states.map((state,i)=> (
                    <option key={i} value={state}>{state}</option>
                ))}
             </select>
             <br></br>
             <select
  value={selectedCity}
  onChange={(e) => setSelectedCity(e.target.value)}
  disabled={!selectedState}
>
  <option value="">Select City</option>
  {cities.map((city, i) => (
    <option key={city} value={city}>{city}</option>
  ))}
</select>
             {selectedCity && selectedState && selectedCountry && (
  <p>
    You selected <strong>{selectedCity}</strong>, {selectedState}, {selectedCountry}
  </p>
)}
        </div>
    )
}

export default LocationSelector