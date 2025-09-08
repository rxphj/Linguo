package de.bund.idvk.backend.Model.Service;

import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

@Service
public class LetterService {
    private char currentLetter;

    @PostConstruct
    public void init() {
        generateNewLetter();
    }

    public char generateNewLetter() {
        char[] buchstaben = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'};
        int rand = (int) (Math.random() * buchstaben.length);
        currentLetter = buchstaben[rand];
        return currentLetter;
    }


    public char getCurrentLetter() {
        return currentLetter;
    }


    public String getCurrentLetterAsString() {
        return String.valueOf(currentLetter);
    }



}