package de.bund.idvk.backend.Model.System;

import de.bund.idvk.backend.Model.Enums.State;

public class Systempreference {
    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    private State state;
}
