export class ChangeUserRequest {
    constructor(
      public name: string,
      public fname: string,
      public mname: string,
      public status: string,
    ) {
    }
  }