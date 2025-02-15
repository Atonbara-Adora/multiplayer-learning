import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StateCreator } from 'zustand';
import { CardType } from './FlashcardStore';

export type Deck = {
    classDeckName: string;
    questions: CardType[];
}

export interface DeckStore {
    deck: Deck[],
    addDeck: (newDeck: Deck) => void;
}

const deckSlice: StateCreator<DeckStore> = (set) => ({
    deck: [],
    addDeck: (newDeck: Deck) => set((state) => ({ deck: [...state.deck, newDeck] })),
});

export const useDeckStore = create<DeckStore>()(
    persist(deckSlice, {
        name: 'deck-store'
    })
);