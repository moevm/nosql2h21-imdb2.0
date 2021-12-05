import { ApiPaths } from "shared/constants/ApiPaths";
import { IFullNameDto, INameDto } from "shared/dtos/NameDto";
import HTTPService from "./HTTPService";
import { getMockName, names } from "./mocks";

class FilmsApiService extends HTTPService {
  public constructor() {
    super(ApiPaths.Names);
  }

  // for mock requests
  private check = true;

  private isMock = process.env.NODE_ENV === "development";

  public getMockNames(): Promise<Array<INameDto>> {
    this.check = false;

    return new Promise((resolve) => {
      setTimeout(() => resolve(names), 1000);
    });
  }

  public getMockNameById(id: string): Promise<IFullNameDto> {
    // TODO: add real request - film by id
    if (!this.isMock) return this.GET("");
    const mockName = getMockName(id);

    return new Promise((resolve) => {
      setTimeout(() => resolve(mockName), 1000);
    });
  }
}

export default new FilmsApiService();
