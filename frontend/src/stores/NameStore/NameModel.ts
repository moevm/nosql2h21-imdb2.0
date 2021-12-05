import { action, makeObservable, observable } from "mobx";
import { IFullNameDto, INameDto, INameProfession } from "shared/dtos/NameDto";
import { Professions } from "../../shared/constants/professions";

class NameModel {
  constructor(nameDto?: INameDto | IFullNameDto) {
    makeObservable(this, {
      id: observable,
      name: observable,
      birthYear: observable,
      deathYear: observable,
      image: observable,
      professions: observable,

      getNamesByProfession: action.bound,
      setNewAvatar: action.bound,
    });

    this.id = nameDto?._id || null;
    this.name = nameDto?.name || null;
    this.birthYear = nameDto?.birthYear || null;
    this.deathYear = nameDto?.deathYear || null;
    this.image = nameDto?.image || null;
    this.newAvatar = nameDto?.image || null;

    if (nameDto !== undefined && "professions" in nameDto) {
      this.professions = nameDto.professions;
    }
  }

  public id: string | null = null;

  public name: string | null = null;

  public birthYear: string | null = null;

  public deathYear: string | null = null;

  public image: string | null = null;

  public newAvatar: string | null = null;

  public professions: Array<INameProfession> = [];

  public getNamesByProfession(
    profession: Professions
  ): Array<Omit<INameProfession, "profession">> {
    return this.professions
      .filter((el) => el.profession === profession)
      .map((pr) => ({
        characters: pr.characters,
        title: pr.title,
        filmId: pr.filmId,
      }));
  }

  public setNewAvatar(avatar: string | null): void {
    this.newAvatar = avatar;
  }
}

export default NameModel;
