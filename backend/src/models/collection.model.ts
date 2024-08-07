export class Collection {
  id: string;
  name: string;
  symbol: string;
  description: string;
  createdAt: Date;

  constructor(partial: Partial<Collection>) {
    Object.assign(this, partial);
  }
}
