
export class ListManipulator<T> {
  private list: T[];

  constructor(list: T[]) {
    this.list = list;
  }

  public removeItem(itemToRemove: T): T[] {
    return this.list.filter((item) => item !== itemToRemove);
  }
}
