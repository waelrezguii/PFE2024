package projet.pfe.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import projet.pfe.model.utilisateur;
@Service
public class MailService {
    @Autowired
    private JavaMailSender mailSender;
    public void sendVerificationEmail(utilisateur user, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("wael.rezgui@esen.tn");
        message.setTo(user.getEmail());
        message.setSubject("Email Verification");
        message.setText("Dear " +user.getNom()+ ",\n\n" +
                "Please click the link below to verify your email address:\n" +
                "http://localhost:4200/verify-email/" + token + "\n\n" +
                "If you did not register for an account on our website, please ignore this email.\n\n" +
                "Best Regards,\n" +
                "Your Website");


        mailSender.send(message);
    }
    public void sendPasswordResetEmail(utilisateur user, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@esen.tn");
        message.setTo(user.getEmail());
        message.setSubject("Password Reset Request");
        message.setText("To reset your password, click the link below:\n" +
                "http://localhost:4200/resetpassword/" + token);

        mailSender.send(message);
    }

}
