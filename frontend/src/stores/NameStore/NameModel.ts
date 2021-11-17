import { makeObservable, observable } from "mobx";
import { INameDto } from "shared/dtos/NameDto";

class NameModel {
  constructor(nameDto: INameDto) {
    makeObservable(this, {
      id: observable,
      name: observable,
      birthYear: observable,
      deathYear: observable,
      image: observable,
    });

    this.id = nameDto.id;
    this.name = nameDto.name;
    this.birthYear = nameDto.birthYear;
    this.deathYear = nameDto.deathYear;
    this.image = nameDto.image;
  }

  public id: number | null = null;

  public name: string | null = null;

  public birthYear: string | null = null;

  public deathYear: string | null = null;

  public image: string | null = null;
}

export default NameModel;
