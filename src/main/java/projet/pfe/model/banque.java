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
    private String Nombanque;

    public String getCodeB() {
        return CodeB;
    }

    public void setCodeB(String codeB) {
        CodeB = codeB;
    }

    public String getNombanque() {
        return Nombanque;
    }

    public void setNombanque(String nombanque) {
        Nombanque = nombanque;
    }

    @Override
    public String toString() {
        return "banque{" +
                "CodeB='" + CodeB + '\'' +
                ", Nombanque='" + Nombanque + '\'' +
                '}';
    }
}
