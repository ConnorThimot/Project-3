package org.example;

import org.junit.jupiter.api.Test;
import java.util.HashSet;
import java.util.Set;
import static org.junit.jupiter.api.Assertions.*;

class DeckTest {

    @Test
    void testDeckInitialization() {
        Deck deck = new Deck(true);
        assertEquals(52, deck.cardsLeft());
    }

    @Test
    void testDeckHas52UniqueCards() {
        Deck deck = new Deck(true);

        Set<String> seen = new HashSet<>();

        while (deck.cardsLeft() > 0) {
            Card c = deck.takeCard();
            seen.add(c.toString());
        }

        assertEquals(52, seen.size());
    }
}