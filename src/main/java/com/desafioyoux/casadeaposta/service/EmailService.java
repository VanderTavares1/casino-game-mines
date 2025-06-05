package com.desafioyoux.casadeaposta.service;

import com.desafioyoux.casadeaposta.entity.EmailEntity;
import com.desafioyoux.casadeaposta.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    UsuarioRepository usuarioRepository;
    
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendMail(EmailEntity email) {
        if (email.getTo() == null || email.getTo().isBlank()) {
            throw new IllegalArgumentException("Destinatário não pode ser nulo ou vazio");
        }
        if (email.getBody() == null || email.getBody().isBlank()) {
            throw new IllegalArgumentException("Corpo do e-mail não pode ser nulo ou vazio");
        }
        var message = new SimpleMailMessage();
        message.setFrom("noreply@email.com");
        message.setTo(email.getTo());
        message.setText(email.getBody());

        mailSender.send(message);
    }

    public String filtrandoSeEmailExisteParaMandarCodigo(String usuario) {
        String nome = usuarioRepository.findNomeByEmail(usuario).orElseThrow();

        String codigoRecuperacao = gerarCodigo();
        String corpoEmail = "Olá " + nome + ", seu código de recuperação é: " + codigoRecuperacao;
        EmailEntity emailEntity = new EmailEntity();
        emailEntity.setTo(usuario);
        emailEntity.setBody(corpoEmail);

        sendMail(emailEntity);

        return "Código enviado para o seu e-mail.";
    }

    private String gerarCodigo() {
        return String.valueOf((int)(Math.random() * 900000) + 100000);
    }
}
