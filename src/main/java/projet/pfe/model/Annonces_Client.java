package projet.pfe.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name ="annonces_client")
public class Annonces_Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idA;
    @Column(name = "montant")
    private Double montant;
    @Column(name="type")
    private String type;
    @Column(name="statut")
    private boolean statut;
    @ManyToOne
    @JoinColumn(name="codedev")
    private devise devise;
    @ManyToOne

    @JoinColumn(name = "cin")

    private utilisateur utilisateur;
    @PrePersist
    public void prePersist() {
        this.statut = false;
    }

    public boolean isStatut() {
        return statut;
    }

    public void setStatut(boolean statut) {
        this.statut = statut;
    }

    public projet.pfe.model.devise getDevise() {
        return devise;
    }

    public void setDevise(projet.pfe.model.devise devise) {
        this.devise = devise;
    }

    public Long getIdA() {
        return idA;
    }

    public void setIdA(Long idA) {
        this.idA = idA;
    }

    public Double getMontant() {
        return montant;
    }

    public void setMontant(Double montant) {
        this.montant = montant;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public projet.pfe.model.utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(projet.pfe.model.utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }
}
