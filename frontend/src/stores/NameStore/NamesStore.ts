import { makeObservable, observable } from "mobx";
import { namesApiService } from "apiServices";
import NameModel from "./NameModel";

class NamesStore {
  constructor() {
    makeObservable(this, {
      names: observable,
      isFetching: observable,
    });
  }

  public names: Array<NameModel> = [];

  public isFetching = false;

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
}

export default new NamesStore();
