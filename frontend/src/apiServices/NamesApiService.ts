import { ApiPaths } from "shared/constants/ApiPaths";
import { IFullNameDto, INameDto } from "shared/dtos/NameDto";
import HTTPService from "./HTTPService";

class FilmsApiService extends HTTPService {
  public constructor() {
    super(ApiPaths.Names);
  }

  public getNames(): Promise<Array<INameDto>> {
    return this.GET("overview/");
  }

  public getNameById(id: string): Promise<IFullNameDto> {
    return this.GET(`${id}`);
  }

  public postName(name: Omit<IFullNameDto, "_id">): Promise<IFullNameDto> {
    return this.POST("", name);
  }

  public updateName(name: IFullNameDto): Promise<IFullNameDto> {
    return this.PUT("", name);
  }
}

export default new FilmsApiService();
