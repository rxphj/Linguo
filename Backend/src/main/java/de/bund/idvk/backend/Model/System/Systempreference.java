package de.bund.idvk.backend.Model.System;

import de.bund.idvk.backend.Model.Enums.State;

public class Systempreference {
    private State state;
    public void setState(State state) {
        this.state = state;
    }
    public State getState() {
        return state;
    }
}
