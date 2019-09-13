import React from 'react';
import styled from 'styled-components';
import Clock from 'react-live-clock';

const Container = styled.div`
	height: 90vh;
	width: 65vw;
	display: flex;
	align-content: flex-start;
	justify-content: space-around;
`;

const CurrentHeading = styled.h1`
	font-size: 10vh;
	color: #fff;
	margin-bottom: 0;
`;
const DayTime = styled.h1`
	font-size: 7vh;
	color: #fff;
	margin-bottom: 0;
	margin-top: 0;
`;
const CurrentInformation = styled.p`
	font-size: 5vh;
	color: #fff;
	margin-top: 1vh;
`;

function CurrentInfo({ dayName }) {
	return (
		<Container>
			<div>
				<CurrentHeading>Aktuell information</CurrentHeading>
				<DayTime>
					{dayName} <Clock />
				</DayTime>
				<CurrentInformation>
					Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin.
					Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd
					boksättare tog att antal bokstäver och blandade dem för att göra ett
					provexemplar av en bok.
				</CurrentInformation>
			</div>
		</Container>
	);
}

export default CurrentInfo;
