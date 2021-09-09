export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  loginToken?: string;
}

export class DefaultUser implements User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public token: string,
    public loginToken?: string
  ) {}
}
