package projet.pfe.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="annonces_banquiers")
public class Annonces_Banquiers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAB;
    @Column(name="taux")
    private Double taux;
@ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="banquier")
    private banquiers banquiers;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ida")
    private Annonces_Client annoncesClient;
@Column(name = "statut")
    private boolean statut;
    @PrePersist
    public void prePersist() {
        this.statut = false;
    }

    public Long getIdAB() {
        return idAB;
    }

    public void setIdAB(Long idAB) {
        this.idAB = idAB;
    }

    public Double getTaux() {
        return taux;
    }

    public void setTaux(Double taux) {
        this.taux = taux;
    }

    public projet.pfe.model.banquiers getBanquiers() {
        return banquiers;
    }

    public void setBanquiers(projet.pfe.model.banquiers banquiers) {
        this.banquiers = banquiers;
    }

    public Annonces_Client getAnnoncesClient() {
        return annoncesClient;
    }

    public void setAnnoncesClient(Annonces_Client annoncesClient) {
        this.annoncesClient = annoncesClient;
    }

    public boolean isStatut() {
        return statut;
    }

    public void setStatut(boolean statut) {
        this.statut = statut;
    }
}
