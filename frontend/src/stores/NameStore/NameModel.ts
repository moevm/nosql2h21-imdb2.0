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
      avatar: observable,
      professions: observable,

      getNamesByProfession: action.bound,
      setNewAvatar: action.bound,
    });

    this.id = nameDto?.id || null;
    this.name = nameDto?.name || null;
    this.birthYear = nameDto?.birthYear || null;
    this.deathYear = nameDto?.deathYear || null;
    this.avatar = nameDto?.avatar || null;
    this.newAvatar = nameDto?.avatar || null;

    if (nameDto !== undefined && "professions" in nameDto) {
      this.professions = nameDto.professions;
    }
  }

  public id: number | null = null;

  public name: string | null = null;

  public birthYear: string | null = null;

  public deathYear: string | null = null;

  public avatar: string | null = null;

  public newAvatar: string | null = null;

  public professions: Array<INameProfession> = [];

  public getNamesByProfession(
    profession: Professions
  ): Array<Omit<INameProfession, "category">> {
    return this.professions
      .filter((el) => el.category === profession)
      .map((pr) => ({
        character: pr.character,
        title: pr.title,
        filmId: pr.filmId,
      }));
  }

  public setNewAvatar(avatar: string | null): void {
    this.newAvatar = avatar;
  }
}

export default NameModel;
