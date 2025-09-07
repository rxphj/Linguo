package de.bund.idvk.backend.Model.System;

import de.bund.idvk.backend.Model.Enums.State;

public class SpielState {
    private State state;
    private int timeLeft;

    public SpielState(State state, int timeLeft) {
        this.state = state;
        this.timeLeft = timeLeft;
    }

    public State getState() {
        return state;
    }

    public int getTimeLeft() {
        return timeLeft;
    }

    public void setState(State state) {
        this.state = state;
    }

    public void setTimeLeft(int timeLeft) {
        this.timeLeft = timeLeft;
    }
}

