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

const getMockFilm = (id: number): IFullFilmDto => {
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

export { films, getMockFilm };
