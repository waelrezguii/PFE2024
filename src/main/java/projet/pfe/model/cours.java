package projet.pfe.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
@JsonIgnoreProperties({"devise","banque"})
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="cours")
public class cours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="Date_cours")
    private LocalDate date_cours;
    @ManyToOne
    @JoinColumn(name="CodeB")
    private banque Banque;
    @ManyToOne
    @JoinColumn(name = "Codedev")
    private devise Devise;
    @Column(name="achat")
    private Double achat;
    @Column(name = "vente")
    private Double vente;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDate getDate_cours() {
        return date_cours;
    }

    public void setDate_cours(LocalDate date_cours) {
        this.date_cours = date_cours;
    }

    public banque getBanque() {
        return Banque;
    }

    public void setBanque(banque banque) {
        Banque = banque;
    }

    public devise getDevise() {
        return Devise;
    }

    public void setDevise(devise devise) {
        Devise = devise;
    }

    public Double getAchat() {
        return achat;
    }

    public void setAchat(Double achat) {
        this.achat = achat;
    }

    public Double getVente() {
        return vente;
    }

    public void setVente(Double vente) {
        this.vente = vente;
    }

    public String getCodeDev(){
        return  Devise!=null?Devise.getCodedev():null;
}
    public String getNomdevise() {
        return Devise != null ? Devise.getNomdevise() : null;
    }
public String getCodeB(){
        return Banque!=null? Banque.getCodeB() : null;
}
    @Override
    public String toString() {
        return "cours{" +
                "id=" + id +
                ", date_cours=" + date_cours +
                ", CodeB=" + getCodeB() +
                ", Codedev=" + getCodeDev() +
                ", Nomdevise="+getNomdevise()+
                ", achat=" + achat +
                ", vente=" + vente +
                '}';
    }
}
