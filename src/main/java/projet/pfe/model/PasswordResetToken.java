package projet.pfe.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;

@Data
@Entity
@Table(name = "password_reset_token")
public class PasswordResetToken {
    private static final int EXPIRATION = 5;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String token;

    @OneToOne(targetEntity = utilisateur.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "cin")
    private utilisateur utilisateur;

    private Date expiryDate;

    public boolean isExpired() {
        return new Date().after(this.expiryDate);
    }
    public void calculateExpiryDate() {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Timestamp(cal.getTime().getTime()));
        cal.add(Calendar.MINUTE, EXPIRATION);
        this.expiryDate = new Date(cal.getTime().getTime());
    }
}
