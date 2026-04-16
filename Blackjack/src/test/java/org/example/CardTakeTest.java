package org.example;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CardTakeTest {

    @Test
    void testTakeCardReducesDeckSize() {
        Deck deck = new Deck(true);
        int initialSize = deck.cardsLeft();

        deck.takeCard();

        assertEquals(initialSize - 1, deck.cardsLeft());
    }

    @Test
    void testTakeCardReturnsCard() {
        Deck deck = new Deck(true);
        Card card = deck.takeCard();

        assertNotNull(card);
    }

    @Test
    void testTakeCardFromEmptyDeck() {
        Deck deck = new Deck(true);

        // Empty the deck
        while (deck.cardsLeft() > 0) {
            deck.takeCard();
        }

        assertThrows(Exception.class, deck::takeCard);
    }
}