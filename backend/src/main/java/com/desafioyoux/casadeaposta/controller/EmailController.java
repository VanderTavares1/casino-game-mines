package com.desafioyoux.casadeaposta.controller;

import com.desafioyoux.casadeaposta.dto.EmailDTO;
import com.desafioyoux.casadeaposta.entity.EmailEntity;
import com.desafioyoux.casadeaposta.service.EmailService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
public class EmailController {
    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public void sendEmail(@RequestBody EmailEntity email){
        emailService.sendMail(email);
    }

    @PostMapping("/recuperar-senha")
    public String filtrandoSeEmailExisteParaMandarCodigo(@RequestBody EmailDTO request) {
        return emailService.filtrandoSeEmailExisteParaMandarCodigo(request.getUsuario());
    }

    @GetMapping
    public String email(){
        return "Código de verificação.";
    }
}
