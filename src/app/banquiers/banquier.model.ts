export class Banquier {
    email: string;
    banque: { codeB: string;  };
    constructor(email: string, banque: { codeB: string;  }) {
      this.email = email;
      this.banque = banque;
    }
  }
  