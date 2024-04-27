package projet.pfe.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "devise")
public class devise {
    @Id
    private String Codedev;
@Column(name="Nomdevise")
    private String Nomdevise;
@Column(name="drapeau")
    private String drapeau;
@Column(name="libelle")
private String libelle;
    public devise(String Codedev) {
        this.Codedev = Codedev;
    }
    public String getCodedev() {
        return Codedev;
    }

    public void setCodedev(String codedev) {
        Codedev = codedev;
    }

    public String getNomdevise() {
        return Nomdevise;
    }

    public void setNomdevise(String nomdevise) {
        Nomdevise = nomdevise;
    }

    public String getDrapeau() {
        return drapeau;
    }

    public void setDrapeau(String drapeau) {
        this.drapeau = drapeau;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    @Override
    public String toString() {
        return "devise{" +
                "Codedev='" + Codedev + '\'' +
                ", Nomdevise='" + Nomdevise + '\'' +
                ", libelle='" + libelle + '\'' +
                ", drapeau='" + drapeau + '\'' +

                '}';
    }
}
