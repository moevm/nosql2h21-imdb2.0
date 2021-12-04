import { action, makeObservable, observable } from "mobx";
import { namesApiService } from "apiServices";
import NameModel from "./NameModel";
import { CardMode } from "../../shared/constants/common";

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

  public mode = CardMode.Static;

  public async getAllNames(): Promise<void> {
    try {
      this.isFetching = true;

      this.names = [];

      const nameDtos = await namesApiService.getMockNames();

      this.names = nameDtos.map((n) => new NameModel(n));
    } catch (err) {
      // ignore
    } finally {
      this.isFetching = false;
    }
  }

  public async getNameById(id: number): Promise<void> {
    try {
      this.isFetching = true;
      this.selectedName = new NameModel(
        await namesApiService.getMockNameById(id)
      );
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

  public async openNameCard(id?: number) {
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
}

export default new NamesStore();
