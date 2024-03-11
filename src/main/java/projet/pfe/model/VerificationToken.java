package projet.pfe.model;

import jakarta.persistence.*;



@Entity
@Table(name = "verification_token")
public class VerificationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
@Column(nullable = false)
    private String token;
@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="cin",nullable = false)
    private utilisateur utilisateur;

    public VerificationToken() {
    }

    public VerificationToken(String token, projet.pfe.model.utilisateur utilisateur) {
        this.token = token;
        this.utilisateur = utilisateur;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public projet.pfe.model.utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(projet.pfe.model.utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }
}
