export default class User {
  public id: number;
  public name: string;
  public password: string;
  public email: string;

  constructor(name: string, email: string, password: string, id: number = -1) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.id = id;
  }

  public getPassword(): string {
    return this.password;
  }

  public getUserData(): any {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
    };
  }

  public toDBObject(): any {
    return {
      email: this.email,
      name: this.name,
      password: this.password,
    };
  }
}
