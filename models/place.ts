export class Place {

  public id: string;
  public address: string;

  constructor(
    public title: string,
    public imageUri: string,
    public location: { lat: number, lng: number, address: string },
  ) {
    this.address = location.address;
    this.id = new Date().toString() + Math.random().toString();
  }

}