export class User {
    constructor(
      public id: number,
      public avatar: string,
      public name: string,
      public fname: string,
      public mname: string,
      public status: number,
      public lastUpdatedAt: Date,
      public balance: number
    ) {
    }
  }