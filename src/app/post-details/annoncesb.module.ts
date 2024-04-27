export interface annoncesb{
    idAB:bigint;
    taux:string;
    banquiers:{
        email:string;
        banque:{
            nombanque:string;
        }
    }
}