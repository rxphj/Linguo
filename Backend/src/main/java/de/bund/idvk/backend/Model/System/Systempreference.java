package de.bund.idvk.backend.Model;

public class Systempreference {
    private String state; // ACTIVE / INACTIVE
    private int seconds;

    public Systempreference() {}

    public Systempreference(String state, int seconds) {
        this.state = state;
        this.seconds = seconds;
    }

    // Getter & Setter
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public int getSeconds() { return seconds; }
    public void setSeconds(int seconds) { this.seconds = seconds; }
}
