package de.bund.idvk.backend.Controller.Websocket;

import de.bund.idvk.backend.Model.Benutzer;
import de.bund.idvk.backend.Model.Wort;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class WebSocketController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private List<Benutzer> registereduser = new ArrayList<>();

    public WebSocketController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/register") // Client sendet an /app/register
    public void register(Benutzer benutzer) {
        System.out.println("Neuer Benutzer: " + benutzer.getUsername());
        registereduser.add(benutzer);

        // Nachricht an alle Clients auf /topic/register senden
        simpMessagingTemplate.convertAndSend("/topic/register", benutzer);
    }
}
