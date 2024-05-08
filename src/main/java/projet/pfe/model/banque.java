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
@Table(name="banque")
public class banque {
    @Id
    private String CodeB;

    @Column(name = "Nombanque")
    private String nombanque;

    public String getCodeB() {
        return CodeB;
    }

    public void setCodeB(String CodeB) {
        this.CodeB = CodeB;
    }

    public String getNombanque() {
        return nombanque;
    }

    public void setNombanque(String nombanque) {
        this.nombanque = nombanque;
    }

    @Override
    public String toString() {
        return "Banque{" +
                "CodeB='" + CodeB + '\'' +
                ", Nombanque='" + nombanque + '\'' +
                '}';
    }
}


