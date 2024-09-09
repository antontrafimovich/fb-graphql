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

// write a database object, which will return data from the stub arrays by stub name with delay
export const db = {
  connect: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          players: {
            getPlayers: () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(players);
                }, 1000); // Hardcoded delay of 1 second
              });
            },
            addPlayers: (newPlayers) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  players.push(...newPlayers);
                  resolve(newPlayers);
                }, 1000); // Hardcoded delay of 1 second
              });
            },
            getPlayerById: (id) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  const player = players.find((p) => p.id === id);
                  resolve(player);
                }, 1000); // Hardcoded delay of 1 second
              });
            },
            getPlayersByClubId: (clubId) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  const clubPlayers = players.filter(
                    (p) => p.clubId === clubId
                  );
                  resolve(clubPlayers);
                }, 1000); // Hardcoded delay of 1 second
              });
            },
            getPlayerByName: (name) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  const player = players.find((p) => p.name === name);
                  resolve(player);
                }, 1000); // Hardcoded delay of 1 second
              });
            },
          },
          coaches: {
            getCoaches: () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(coaches);
                }, 1000); // Hardcoded delay of 1 second
              });
            },
            getCoachById: (id) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  const coach = coaches.find((c) => c.id === id);
                  resolve(coach);
                }, 1000); // Hardcoded delay of 1 second
              });
            },
            getCoachByClubId: (clubId) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  const clubCoach = coaches.find((c) => c.clubId === clubId);
                  resolve(clubCoach);
                }, 1000); // Hardcoded delay of 1 second
              });
            },
          },
          clubs: {
            getClubs: () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(clubs);
                }, 1000); // Hardcoded delay of 1 second
              });
            },
            getClubById: (id) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  const club = clubs.find((c) => c.id === id);
                  resolve(club);
                }, 1000); // Hardcoded delay of 1 second
              });
            },
            getClubByName: (name) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  const club = clubs.find((c) => c.name === name);
                  resolve(club);
                }, 1000); // Hardcoded delay of 1 second
              });
            },
            getClubsByCountry: (country) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  const countryClubs = clubs.filter(
                    (c) => c.country === country
                  );
                  resolve(countryClubs);
                }, 1000); // Hardcoded delay of 1 second
              });
            },
          },
        });
      }, 1000); // Hardcoded delay of 1 second
    });
  },
};
