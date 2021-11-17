import { ApiPaths } from "shared/constants/ApiPaths";
import { INameDto } from "shared/dtos/NameDto";
import HTTPService from "./HTTPService";

class FilmsApiService extends HTTPService {
  public constructor() {
    super(ApiPaths.Names);
  }

  // for mock requests
  private check = true;

  public getMockNames(): Promise<Array<INameDto>> {
    this.check = false;
    const names = [
      {
        id: 1,
        name: "name1",
        birthYear: "1994",
        deathYear: null,
        image: null,
      },
      {
        id: 2,
        name: "name2",
        birthYear: "1965",
        deathYear: "2020",
        image: null,
      },
      {
        id: 3,
        name: "name3",
        birthYear: "1996",
        deathYear: null,
        image: null,
      },
    ];

    return new Promise((resolve) => {
      setTimeout(() => resolve(names), 1000);
    });
  }
}

export default new FilmsApiService();
