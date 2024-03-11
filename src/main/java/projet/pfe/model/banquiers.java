package projet.pfe.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="banquiers")
public class banquiers {
    @Id
    private String email;
    @Column(name="mot_de_passe")
    private String mdp;
    @ManyToOne
    @JoinColumn(name="CodeB")
    private banque Banque;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMdp() {
        return mdp;
    }

    public void setMdp(String mdp) {
        this.mdp = mdp;
    }

    public banque getBanque() {
        return Banque;
    }

    public void setBanque(banque banque) {
        Banque = banque;
    }
    public String getCodeB(){
        return Banque!=null? Banque.getCodeB() : null;
    }

    @Override
    public String toString() {
        return "banquiers{" +
                "email='" + email + '\'' +
                ", mdp='" + mdp + '\'' +
                ", CodeB=" + getCodeB() +
                '}';
    }
}
