import { action, makeObservable, observable } from "mobx";
import { CardMode } from "shared/constants/common";
import { namesApiService } from "apiServices";
import NameModel from "./NameModel";
import { appStore } from "../index";
import { IFullNameDto } from "../../shared/dtos/NameDto";

class NamesStore {
  constructor() {
    makeObservable(this, {
      names: observable,
      isFetching: observable,
      selectedName: observable,
      mode: observable,
      canSubmit: observable,
      isModalUrlEditFormOpen: observable,

      getNameById: action.bound,
      setCardMode: action.bound,
      getAllNames: action.bound,
      setCanSubmit: action.bound,
      closeNameCard: action.bound,
      setIsModalUrlEditFormOpen: action.bound,
    });
  }

  public names: Array<NameModel> = [];

  public isFetching = false;

  public canSubmit = false;

  public isModalUrlEditFormOpen = false;

  public selectedName = new NameModel();

  public mode = CardMode.Closed;

  public async getAllNames(): Promise<NameModel[]> {
    try {
      this.isFetching = true;

      this.names = [];

      const nameDtos = await namesApiService.getNames();

      this.names = nameDtos.map((n) => new NameModel(n));

      return this.names;
    } catch (err) {
      return [];
      // ignore
    } finally {
      this.isFetching = false;
    }
  }

  public async getNameById(id: string): Promise<void> {
    try {
      this.isFetching = true;
      const name = await namesApiService.getNameById(id);
      this.selectedName = new NameModel(name);
    } catch (err) {
      // ignore
    } finally {
      this.isFetching = false;
    }
  }

  public setCardMode(mode: CardMode): void {
    this.mode = mode;
  }

  public setCanSubmit(canSubmit: boolean): void {
    this.canSubmit = canSubmit;
  }

  public setIsModalUrlEditFormOpen(isModalUrlEditFormOpen: boolean): void {
    this.isModalUrlEditFormOpen = isModalUrlEditFormOpen;
  }

  public async openNameCard(id?: string) {
    if (!id) {
      this.mode = CardMode.Creating;
      return;
    }

    try {
      await this.getNameById(id);

      this.mode = CardMode.Static;
    } catch (err) {
      // ignore
    }
  }

  public closeNameCard() {
    try {
      this.selectedName = new NameModel();
      this.mode = CardMode.Closed;
    } catch (err) {
      // ignore
    }
  }

  public async postName(name: Omit<IFullNameDto, "_id">): Promise<void> {
    try {
      const newName = await namesApiService.postName(name);

      appStore.addName({ name: newName.name, id: newName._id });
      await this.getAllNames();
    } catch (err) {
      // ignore
    }
  }

  public async updateName(name: IFullNameDto): Promise<void> {
    try {
      const newName = await namesApiService.updateName(name);

      appStore.updateName({ name: newName.name, id: newName._id });
      await this.getAllNames();
    } catch (err) {
      // ignore
    }
  }
}

export default new NamesStore();
