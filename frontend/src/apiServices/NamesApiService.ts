import { ApiPaths } from "shared/constants/ApiPaths";
import { INameDto } from "shared/dtos/NameDto";
import HTTPService from "./HTTPService";

class FilmsApiService extends HTTPService {
  public constructor() {
    super(ApiPaths.Names);
  }

  public getNames(): Promise<Array<INameDto>> {
    return this.GET("");
  }
}

export default new FilmsApiService();
