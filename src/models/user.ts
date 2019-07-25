export default class User {
  private name: string;
  private password: string;
  private email: string;

  constructor(name: string, email: string, password: string) {
    this.email = email;
    this.name = name;
    this.password = password;
  }

  public getPassword(): string {
    return this.password;
  }

  public getUserData(): any {
    return {
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
