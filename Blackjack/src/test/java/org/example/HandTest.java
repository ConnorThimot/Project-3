package org.example;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class HandTest {

    @Test
    void testAceAdjustment() {
        Hand hand = new Hand();

        hand.addCard(new Card(Suit.HEART, Rank.ACE));
        hand.addCard(new Card(Suit.CLUB, Rank.KING));
        hand.addCard(new Card(Suit.SPADE, Rank.FIVE));

        assertEquals(16, hand.calculatedValue());
    }

    @Test
    void testMultipleAcesAdjustment() {
        Hand hand = new Hand();

        hand.addCard(new Card(Suit.HEART, Rank.ACE));
        hand.addCard(new Card(Suit.CLUB, Rank.ACE));
        hand.addCard(new Card(Suit.SPADE, Rank.NINE));

        assertEquals(21, hand.calculatedValue());
    }

    @Test
    void testAceNoAdjustmentNeeded() {
        Hand hand = new Hand();

        hand.addCard(new Card(Suit.HEART, Rank.ACE));
        hand.addCard(new Card(Suit.CLUB, Rank.FIVE));

        assertEquals(16, hand.calculatedValue());
    }

    @Test
    void testBust() {
        Hand hand = new Hand();

        hand.addCard(new Card(Suit.HEART, Rank.KING));
        hand.addCard(new Card(Suit.CLUB, Rank.QUEEN));
        hand.addCard(new Card(Suit.SPADE, Rank.TWO));

        assertTrue(hand.calculatedValue() > 21);
    }

    @Test
    void testBlackjack() {
        Hand hand = new Hand();

        hand.addCard(new Card(Suit.HEART, Rank.ACE));
        hand.addCard(new Card(Suit.CLUB, Rank.KING));

        assertEquals(21, hand.calculatedValue());
    }
}