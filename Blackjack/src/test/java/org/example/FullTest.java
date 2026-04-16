package org.example;

import org.junit.jupiter.api.Test;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;

class BlackjackFullTest {

    // ===== Deck / Card Tests =====

    @Test
    void testDeckStartsWith52Cards() {
        Deck deck = new Deck(true);
        assertEquals(52, deck.cardsLeft());
    }

    @Test
    void testTakeCardReducesDeckSize() {
        Deck deck = new Deck(true);
        int initial = deck.cardsLeft();

        deck.takeCard();

        assertEquals(initial - 1, deck.cardsLeft());
    }

    @Test
    void testTakeCardReturnsCard() {
        Deck deck = new Deck(true);
        assertNotNull(deck.takeCard());
    }

    @Test
    void testTakeAllCards() {
        Deck deck = new Deck(true);
        int count = 0;

        while (deck.cardsLeft() > 0) {
            assertNotNull(deck.takeCard());
            count++;
        }

        assertEquals(52, count);
        assertEquals(0, deck.cardsLeft());
    }

    @Test
    void testTakeCardFromEmptyDeckThrows() {
        Deck deck = new Deck(true);

        while (deck.cardsLeft() > 0) {
            deck.takeCard();
        }

        assertThrows(Exception.class, deck::takeCard);
    }

    @Test
    void testDeckHasAllUniqueCards() {
        Deck deck = new Deck(true);
        Set<String> seen = new HashSet<>();

        while (deck.cardsLeft() > 0) {
            seen.add(deck.takeCard().toString());
        }

        assertEquals(52, seen.size());
    }

    @Test
    void testDeckContainsAllRanksAndSuits() {
        Deck deck = new Deck(true);
        Set<Rank> ranks = new HashSet<>();
        Set<Suit> suits = new HashSet<>();

        while (deck.cardsLeft() > 0) {
            Card c = deck.takeCard();
            ranks.add(c.getRank());
            suits.add(c.getSuit());
        }

        assertEquals(13, ranks.size());
        assertEquals(4, suits.size());
    }

    // ===== Card Tests =====

    @Test
    void testGetRankAndSuit() {
        Card card = new Card(Suit.HEART, Rank.ACE);
    }
}