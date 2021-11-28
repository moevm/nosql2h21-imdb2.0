import { IFullFilmDto } from "../shared/dtos/FilmDto";
import { ProfessionsList } from "../stores/FilmStore/FilmModel";

const films = [
  {
    id: 1,
    title: "Film1",
    isAdult: true,
    releaseYear: 2019,
    duration: 132,
    genres: ["drama", "crime", "thriller"],
    poster: null,
  },
  {
    id: 2,
    title: "Film2",
    isAdult: false,
    releaseYear: 2009,
    duration: 172,
    genres: ["comedy", "crime", "historical"],
    poster: null,
  },
  {
    id: 3,
    title: "Film3",
    isAdult: false,
    releaseYear: 2005,
    duration: 140,
    genres: ["thriller", "horror"],
    poster: null,
  },
];

function randomInteger(min: number, max: number): number {
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const getMockFilm = (id: number): IFullFilmDto => {
  // FIXME: for real data
  if (id === undefined || (id < 1 && id > 3)) id = randomInteger(1, 3);

  const film = films.find((f) => f.id === id);

  return {
    ...film!,
    professions: [
      {
        name: "Jack",
        category: "Actor",
        character: "character1",
      },
      {
        name: "Bob",
        category: "Actor",
        character: "character2",
      },
      {
        name: "Teodor",
        category: "Actor",
        character: "character3",
      },
      {
        name: "Steven",
        category: "Writer",
        character: null,
      },
      {
        name: "Some",
        category: "Director",
        character: null,
      },
      {
        name: "Garry Oldman",
        category: "Director",
        character: null,
      },
      {
        name: "Henry Ford",
        category: "Director",
        character: null,
      },
    ],
  };
};

const genres = ["drama", "crime", "thriller", "comedy", "historical", "horror"];

const cast: ProfessionsList = {
  Director: [
    "Some",
    "Garry Oldman",
    "Henry Ford",
    "check1",
    "check2",
    "check3",
  ],
  Writer: ["Steven", "Lolez", "writercheck"],
  Actor: [
    { name: "Bob", character: "character2" },
    { name: "Jack", character: "character1" },
    { name: "Teodor", character: "character3" },
    { name: "Fake", character: "character_fake" },
  ],
};

export { films, getMockFilm, genres, cast };
