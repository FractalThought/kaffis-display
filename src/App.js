import React from "react";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import "./App.css";

import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import CurrentInfo from "./Components/CurrentInfo";
import Matsedel from "./Components/Matsedel";

/*
	Todo: Call API each monday for a refresh of the matsedel-info
	Todo: Call API once every few minutes to get updated info for the AktuellInfo

	Check if it should have more than 2 slides...
*/

/*
  Need to do the following:
  Database on MongoDB
  Backend REST API API on Heroku
  Kaffis-display app published to Netlify
  CMS published somewhere
  Discord bot that can display info
*/

const API = "http://localhost:5000/api/matsedel";

function useAPI() {
  const [matsedel, setMatsedel] = useState([
    {
      monday: "NOTHING",
      mondayVeg: "Less than Nothing",
      tuesday: "",
      tuesdayVeg: "",
      wednesday: "",
      wednesdayVeg: "",
      thursday: "",
      thursdayVeg: "",
      friday: "",
      fridayVeg: ""
    },
    {
      monday: "NOTHING",
      mondayVeg: "Less than Nothing",
      tuesday: "NOTHING",
      tuesdayVeg: "",
      wednesday: "NOTHING",
      wednesdayVeg: "",
      thursday: "NOTHING",
      thursdayVeg: "",
      friday: "NOTHING",
      fridayVeg: ""
    }
  ]);

  async function fetchMatsedel() {
    await Axios.get(API).then(res => setMatsedel(res.data));
  }

  useEffect(() => {
    fetchMatsedel();
  }, []);

  return [matsedel, fetchMatsedel];
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  const [matsedel, fetchMatsedel] = useAPI();

  const [day, setDay] = useState(new Date());

  let numberedDay = day.getDay();

  useInterval(() => {
    console.log("Updating");
    setDay(new Date());
  }, 60000);

  let stringDay = "";

  switch (numberedDay) {
    case 1:
      stringDay = "Måndag";
      break;
    case 2:
      stringDay = "Tisdag";
      break;
    case 3:
      stringDay = "Onsdag";
      break;
    case 4:
      stringDay = "Torsdag";
      break;
    case 5:
      stringDay = "Fredag";
      break;
    default:
      stringDay = "Måndag";
      break;
  }

  return (
    <div className="App">
      <Carousel
        animationSpeed={1500}
        autoPlay={30000}
        centered
        infinite
        stopAutoPlayOnHover
      >
        <Matsedel
          currentDay={numberedDay}
          dayName={stringDay}
          matsedel={matsedel}
        ></Matsedel>
        <CurrentInfo currentDay={numberedDay} dayName={stringDay}></CurrentInfo>
      </Carousel>
    </div>
  );
}

export default App;
