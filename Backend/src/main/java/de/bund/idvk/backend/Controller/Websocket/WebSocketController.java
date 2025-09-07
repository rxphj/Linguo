package de.bund.idvk.backend.Controller.Websocket;

import de.bund.idvk.backend.Model.Benutzer;
import de.bund.idvk.backend.Model.Enums.State;
import de.bund.idvk.backend.Model.System.SpielState;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final List<Benutzer> registeredUsers = new ArrayList<>();
    private boolean timerRunning = false;
    private Timer timer;
    private int timeLeft;
    private final int ROUND_DURATION = 60;
    private final int PAUSE_DURATION = 30;
    private State gameState = State.PAUSE;

    public WebSocketController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/register")
    public void register(Benutzer benutzer) {
        registeredUsers.add(benutzer);
        simpMessagingTemplate.convertAndSend("/topic/register", benutzer);

        if (!timerRunning) startGameLoop();
    }

    private void startGameLoop() {
        gameState = State.ACTIVE;
        timerRunning = true;
        timeLeft = ROUND_DURATION;

        timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                timeLeft--;
                simpMessagingTemplate.convertAndSend("/topic/state", new SpielState(gameState, timeLeft));

                if (timeLeft <= 0) {
                    if (gameState == State.ACTIVE) {
                        gameState = State.PAUSE;
                        timeLeft = PAUSE_DURATION;
                    } else {
                        gameState = State.ACTIVE;
                        timeLeft = ROUND_DURATION;
                    }
                }
            }
        }, 0, 1000);
    }
}
