import React from "react";
import styled from "styled-components";
import Clock from "react-live-clock";

const Container = styled.div`
  height: 90vh;
  width: 90vw;
  display: grid;
  grid-template-columns: 2fr 5fr;
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 1vh 2vw;
  margin: 5vh 17, 5vw;
`;

const MenuDiv = styled.div`
  grid-column: 1/1;
  background: ${props => {
    switch (props.day) {
      case 0:
        return "#FFDB86";
      case 1:
        return "#DDE793";
      case 2:
        return "#9FD6F5";
      case 3:
        return "#F88371";
      case 4:
        return "#DDE793";
      default:
        return "#FFF";
    }
  }};

  color: #444;
  padding: 0.5rem;
`;

const ListHeading = styled.h1`
  font-size: 8vmin;
  color: #fff;
  margin: 0;
  padding: 3vh 0;
  grid-row: 1/1;
  grid-column: 1/1;
`;

const ClockHeading = styled.h1`
  font-size: 8vh;
  color: #fff;
  margin: 0;
  padding: 3vh 0;
  grid-row: 1/1;
  grid-column: 2/2;
  text-align: right;
`;

const CurrentDayContainer = styled.div`
  grid-column: 2/2;
  grid-row: 2/-1;
  font-size: 7vmin;
  color: #444;
  padding: 0.5rem;
  text-align: center;
  background-color: #fff;
  font-weight: bold;
`;

const LunchHeading = styled.h1`
  margin: 0;
`;

const LunchParagraf = styled.p`
  padding: 0;
  margin: 0;
`;

function MenuItem({ day, vanlig, veg }) {
  let writtenday = "";

  switch (day) {
    case 0:
      writtenday = "Måndag";
      break;
    case 1:
      writtenday = "Tisdag";
      break;
    case 2:
      writtenday = "Onsdag";
      break;
    case 3:
      writtenday = "Torsdag";
      break;
    case 4:
      writtenday = "Fredag";
      break;
    default:
      writtenday = "Måndag";
      break;
  }

  return (
    <MenuDiv day={day}>
      <LunchHeading>{writtenday}</LunchHeading>
      <LunchParagraf>{vanlig}</LunchParagraf>
      <LunchParagraf>{veg}</LunchParagraf>
    </MenuDiv>
  );
}

function Matsedel({ currentDay, dayName, matsedel }) {
  /*
    Data looks like this:
	"monday": "Köttbullar serveras med stuvade makaroner",
	"mondayVeg": "Quorn bullar serveras med stuvade makaroner",
	"tuesday": "Sprödbakad fisk serveras med remouladsås och kokt potatis",
	"tuesdayVeg": "Sprödbakade grönsaksbiffar serveras med remouladsås och kokt potatis",
	"wednesday": "Bönbiffar serveras med tomatsås och grönsaksris",
	"wednesdayVeg": "Bönbiffar serveras med tomatsås och grönsaksris",
	"thursday": "Ost och broccolisoppa serveras med mjukt bröd",
	"thursdayVeg": "Grön ärtsoppa serveras med mjukt bröd",
	"friday": "Helstekt fläskytterfilé serveras med potatisgratäng",
  "fridayVeg": "Vegetariska biffar serveras med potatisgratäng"
  
  (In reality, its an array, but shouldn't be later on)
  */
  const currentMatsedel = Object.values(matsedel[1]);
  /*
    Now it looks like this:
    ["mondayValue", "mondayVegValue", "tuesdayValue", ""]
  */
  const vanlig = [];
  const vegetarisk = [];
  for (let index = 0; index < currentMatsedel.length - 1; index += 2) {
    vanlig.push(currentMatsedel[index]);
    vegetarisk.push(currentMatsedel[index + 1]);
  }

  let currentLunch = {
    vanlig: vanlig[currentDay - 1],
    vegetarisk: vegetarisk[currentDay - 1]
  };

  return (
    <Container>
      <ListHeading>Matsedel</ListHeading>
      <ClockHeading>
        <Clock ticking={true} format={"HH:mm:ss"} />
      </ClockHeading>
      {vanlig.map((item, key) => {
        if (key !== currentDay - 1) {
          return (
            <MenuItem
              key={key}
              day={key}
              vanlig={item}
              veg={vegetarisk[key]}
            ></MenuItem>
          );
        } else {
          return null;
        }
      })}
      <CurrentDayContainer>
        <LunchHeading>Idag ({dayName})</LunchHeading>
        <LunchParagraf>{currentLunch.vanlig}</LunchParagraf>
        <LunchParagraf>{currentLunch.vegetarisk}</LunchParagraf>
      </CurrentDayContainer>
    </Container>
  );
}

export default Matsedel;
