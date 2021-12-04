import { IFullFilmDto } from "../shared/dtos/FilmDto";

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
        id: 1,
        name: "Jack",
        category: "Actor",
        character: "character1",
      },
      {
        id: 2,
        name: "Bob",
        category: "Actor",
        character: "character2",
      },
      {
        id: 3,
        name: "Teodor",
        category: "Actor",
        character: "character3",
      },
      {
        id: 4,
        name: "Steven",
        category: "Writer",
        character: null,
      },
      {
        id: 5,
        name: "Some",
        category: "Director",
        character: null,
      },
      {
        id: 6,
        name: "Garry Oldman",
        category: "Director",
        character: null,
      },
      {
        id: 7,
        name: "Henry Ford",
        category: "Director",
        character: null,
      },
      {
        id: 13,
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
export { films, getMockFilm, genres, cast };
