package com.example.identityservice.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Async
    public void sendVerificationCode(String to, String code) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

            String html = """
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <h2>Email təsdiqi</h2>
                        <p>Salam!</p>
                        <p>Sizin təsdiq kodunuz:</p>
                        <h3 style="color:#007bff;">%s</h3>
                        <p>Bu kod 10 dəqiqə ərzində etibarlıdır.</p>
                        <br/>
                        <p>Hörmətlə,<br/>IdentityService komandası</p>
                    </div>
                    """.formatted(code);

            helper.setTo(to);
            helper.setSubject("Email Təsdiqi - Identity Service");
            helper.setText(html, true);

            mailSender.send(message);
            System.out.println("Email göndərildi: " + to);
        } catch (MessagingException e) {
            System.err.println("Email göndərilmədi: " + e.getMessage());
        }
    }
}
