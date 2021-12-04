import { IFullFilmDto } from "../shared/dtos/FilmDto";
import { IFullNameDto, INameDto } from "../shared/dtos/NameDto";

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

const names: Array<INameDto> = [
  {
    id: 1,
    name: "Jack",
    birthYear: "1994",
    deathYear: null,
    avatar: null,
  },
  {
    id: 2,
    name: "Bob",
    birthYear: "1965",
    deathYear: "2020",
    avatar: null,
  },
  {
    id: 3,
    name: "Teodor",
    birthYear: "1996",
    deathYear: null,
    avatar: null,
  },
  {
    id: 4,
    name: "Steven",
    birthYear: "1994",
    deathYear: null,
    avatar: null,
  },
  {
    id: 5,
    name: "Some",
    birthYear: "1965",
    deathYear: "2020",
    avatar: null,
  },
  {
    id: 6,
    name: "Garry Oldman",
    birthYear: "1996",
    deathYear: null,
    avatar: null,
  },
  {
    id: 7,
    name: "Henry Ford",
    birthYear: "1994",
    deathYear: null,
    avatar: null,
  },
  {
    id: 8,
    name: "check1",
    birthYear: "1965",
    deathYear: "2020",
    avatar: null,
  },
  {
    id: 9,
    name: "check2",
    birthYear: "1996",
    deathYear: null,
    avatar: null,
  },
  {
    id: 10,
    name: "check3",
    birthYear: "1994",
    deathYear: null,
    avatar: null,
  },
  {
    id: 11,
    name: "Lolez",
    birthYear: "1965",
    deathYear: "2020",
    avatar: null,
  },
  {
    id: 12,
    name: "writercheck",
    birthYear: "1996",
    deathYear: null,
    avatar: null,
  },
  {
    id: 13,
    name: "Fake",
    birthYear: "1996",
    deathYear: null,
    avatar: null,
  },
];

function randomInteger(min: number, max: number): number {
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const getMockName = (id: number): IFullNameDto => {
  // FIXME: for real data
  if (id === undefined || (id < 1 && id > 13)) id = randomInteger(1, 13);

  const name = names.find((n) => n.id === id);

  return {
    ...name!,
    professions: [
      {
        filmId: 1,
        title: "Film1",
        category: "Actor",
        character: "character1",
      },
      {
        filmId: 1,
        title: "Film1",
        category: "Actor",
        character: "character2",
      },
      {
        filmId: 2,
        title: "Film2",
        category: "Actor",
        character: "character3",
      },
      {
        filmId: 3,
        title: "Film3",
        category: "Writer",
        character: null,
      },
    ],
  };
};

const getMockFilm = (id: number): IFullFilmDto => {
  // FIXME: for real data
  if (id === undefined || (id < 1 && id > 3)) id = randomInteger(1, 3);

  const film = films.find((f) => f.id === id);

  return {
    ...film!,
    professions: [
      {
        nameId: 1,
        name: "Jack",
        category: "Actor",
        character: "character1",
      },
      {
        nameId: 2,
        name: "Bob",
        category: "Actor",
        character: "character2",
      },
      {
        nameId: 3,
        name: "Teodor",
        category: "Actor",
        character: "character3",
      },
      {
        nameId: 4,
        name: "Steven",
        category: "Writer",
        character: null,
      },
      {
        nameId: 5,
        name: "Some",
        category: "Director",
        character: null,
      },
      {
        nameId: 6,
        name: "Garry Oldman",
        category: "Director",
        character: null,
      },
      {
        nameId: 7,
        name: "Henry Ford",
        category: "Director",
        character: null,
      },
      {
        nameId: 13,
        name: "Fake",
        category: "Producer",
        character: null,
      },
    ],
  };
};

const genres = ["drama", "crime", "thriller", "comedy", "historical", "horror"];

const cast: Array<{ name: string; id: number }> = [
  { name: "Some", id: 5 },
  { name: "Garry Oldman", id: 6 },
  { name: "Henry Ford", id: 7 },
  { name: "check1", id: 8 },
  { name: "check2", id: 9 },
  { name: "check3", id: 10 },
  { name: "Steven", id: 4 },
  { name: "Lolez", id: 11 },
  { name: "writercheck", id: 12 },
  { name: "Bob", id: 2 },
  { name: "Jack", id: 1 },
  { name: "Teodor", id: 3 },
  { name: "Fake", id: 13 },
];

export { films, getMockFilm, genres, cast, names, getMockName };
