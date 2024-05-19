export class Utilisateur {
    cin: string;
    nom: string;
    prenom: string;
    email: string;
    mdp: string; 
    verified: boolean;
  
    constructor(cin: string, nom: string, prenom: string, email: string, mdp: string, verified: boolean) {
      this.cin = cin;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.mdp = mdp;
      this.verified = verified;
    }
  }
  