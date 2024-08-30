// create stub array of football players
const players = [
  { id: "222", name: "Anton", position: "Defender", clubId: "1" },
  { id: "333", name: "John", position: "Midfielder", clubId: "2" },
  { id: "444", name: "Mike", position: "Forward", clubId: "3" },
];

// create stub array of football coaches
const coaches = [
  { id: "qwe", name: "Alex", clubId: "1" },
  { id: "asd", name: "David", clubId: "2" },
  { id: "123", name: "Michael", clubId: "3" },
  { id: "zxcvzxcv", name: "Sarah", clubId: "4" },
  { id: "asdfasdf", name: "Robert", clubId: "5" },
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
