export class Asset {
  name: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  manufactureDate: Date;

  collectionId: string;
  id: string;
  topicId: string;

  constructor(partial: Partial<Asset>) {
    Object.assign(this, partial);
  }
}
