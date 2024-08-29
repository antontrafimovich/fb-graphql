// create stub array of football players
const players = [
  { id: "222", name: "Anton", position: "Defender", team: "Real Madrid" },
  { id: "333", name: "John", position: "Midfielder", team: "Barcelona" },
  { id: "444", name: "Mike", position: "Forward", team: "Liverpool" },
];

// create stub array of football coaches
const coaches = [
  { id: "qwe", name: "Alex", team: "Real Madrid" },
  { id: "asd", name: "David", team: "Barcelona" },
  { id: "123", name: "Michael", team: "Liverpool" },
  { id: "zxcvzxcv", name: "Sarah", team: "Manchester United" },
  { id: "asdfasdf", name: "Robert", team: "Bayern Munich" },
];

const clubs = [
  {
    id: "1",
    name: "Real Madrid",
    country: "Spain",
  },
  {
    id: "2",
    name: "Barcelona",
    country: "Spain",
  },
  {
    id: "3",
    name: "Liverpool",
    country: "England",
  },
  {
    id: "4",
    name: "Manchester United",
    country: "England",
  },
  {
    id: "5",
    name: "Bayern Munich",
    country: "Germany",
  },
];

export const db = {
  players,
  coaches,
  clubs,
};
