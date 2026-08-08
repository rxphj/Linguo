package de.bund.idvk.backend.Controller.Websocket;

import de.bund.idvk.backend.Model.Enums.State;
import de.bund.idvk.backend.Model.System.Systempreference;
import de.bund.idvk.backend.Model.Service.BenutzerService;
import de.bund.idvk.backend.Model.Service.LetterService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Timer;
import java.util.TimerTask;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private  LetterService letterService;
    @Autowired
    private  BenutzerService benutzerService; // Korrekt injiziert

    private State sessionState = State.INACTIVE;
    private int timerSeconds = 0;

    public WebSocketController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;

    }
    // Beim Start des Server wird einer Timer initiiert
    @PostConstruct
    public void startServerTimer() {
        Timer timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                if(!benutzerService.getRegistered().isEmpty()) {
                    if (timerSeconds <= 0) {
                        if (sessionState == State.ACTIVE) {
                            sessionState = State.INACTIVE;
                            timerSeconds = 5; // Pause
                        } else {
                            sessionState = State.ACTIVE;
                            timerSeconds = 60; // Neue Runde
                            char neuerBuchstabe = letterService.generateNewLetter();
                            simpMessagingTemplate.convertAndSend("/topic/buchstabe",
                                    String.valueOf(neuerBuchstabe).toUpperCase());
                        }
                    }
                    timerSeconds--;

                }
                simpMessagingTemplate.convertAndSend("/topic/session",
                        new Systempreference(sessionState.name(), timerSeconds));
            }
        }, 0, 1000);
    }

    // Übergabe des Timerstatus ans Backend
    @MessageMapping("/session/init")
    public void initSession() {
        simpMessagingTemplate.convertAndSend("/topic/session",
                new Systempreference(sessionState.name(), timerSeconds));
    }
    //Übergabe des gezogenen Buchstabe
    @MessageMapping("/session/buchstabe")
    public void getBuchstabe() {
        char currentLetter = letterService.getCurrentLetter();
        simpMessagingTemplate.convertAndSend("/topic/buchstabe",
                String.valueOf(currentLetter).toUpperCase());
    }
    //Übergabe des aktuell angemeldeten Benutzers
    @MessageMapping("/session/benutzer")
    public void showRegisteredBenutzer() {
        if (benutzerService != null && benutzerService.getRegistered() != null && !benutzerService.getRegistered().isEmpty()) {
            System.out.println(benutzerService.getRegistered().getFirst().getUsername());
            simpMessagingTemplate.convertAndSend("/topic/benutzer", benutzerService.getRegistered());
        } else {
            simpMessagingTemplate.convertAndSend("/topic/benutzer", "[]"); // Leeres Array senden
        }
    }
}