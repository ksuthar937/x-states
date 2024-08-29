import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");

  const [states, setStates] = useState([]);
  const [state, setState] = useState("");

  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch(
          `https://crio-location-selector.onrender.com/country=${country}/states`
        );
        const data = await res.json();
        setStates(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (country) {
      fetchStates();
    }
  }, [country]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(
          `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
        );
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (state) {
      fetchCities();
    }
  }, [country, state]);

  return (
    <main>
      <h1>Select Location</h1>
      <div className="inputs">
        <select onChange={(e) => setCountry(e.target.value)}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select onChange={(e) => setState(e.target.value)} disabled={!country}>
          <option>Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select onChange={(e) => setCity(e.target.value)} disabled={!state}>
          <option>Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {city && (
        <h2>
          You Selected <span className="city">{city}, </span>
          <span className="state">{state},</span>
          <span className="state"> {country}</span>
        </h2>
      )}
    </main>
  );
}

export default App;
