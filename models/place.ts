export class Place {

  constructor(
    public title: string,
    public imageUri: string,
    public address: string,
    public location: { lat: number, lng: number },
    public id: string
  ) {
    this.id = new Date().toString() + Math.random().toString();
  }

}