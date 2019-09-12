import React from 'react';
import './App.css';

import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import CurrentInfo from './Components/CurrentInfo';
import Matsedel from './Components/Matsedel';

/*
	Todo: Call API each monday for a refresh of the matsedel-info
	Todo: Call API once every few minutes to get updated info for the AktuellInfo

	Check if it should have more than 2 slides...
*/

function App() {
	let day = new Date();
	let numberedDay = day.getDay();

	let stringDay = '';

	switch (numberedDay) {
		case 1:
			stringDay = 'Måndag';
			break;
		case 2:
			stringDay = 'Tisdag';
			break;
		case 3:
			stringDay = 'Onsdag';
			break;
		case 4:
			stringDay = 'Torsdag';
			break;
		case 5:
			stringDay = 'Fredag';
			break;
		default:
			stringDay = 'Måndag';
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
				<Matsedel currentDay={numberedDay} dayName={stringDay}></Matsedel>
				<CurrentInfo currentDay={numberedDay} dayName={stringDay}></CurrentInfo>
			</Carousel>
		</div>
	);
}

export default App;
