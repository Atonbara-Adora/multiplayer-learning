import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StateCreator } from 'zustand';

export type CardType = {
    text: string;
    answers: string[];
    correctAnswer: string;
};

export interface FlashCardStore {
    classDeckName: string;
    questions: CardType[];
    setDeckName: (deckName: string) => void;
    createQuestion: () => void;
    currentQuestionIndex: number;
    setCurrentQuestionIndex: (index: number) => void;
    updateQuestion: (index: number, card: CardType) => void;
}

const flashCardSlice: StateCreator<FlashCardStore> = (set) => ({
    classDeckName: "",
    questions: [],
    currentQuestionIndex: -1,
    setDeckName: (deckName: string) => set({ classDeckName: deckName }),
    createQuestion: () =>
        set((state) => ({
            questions: [
                ...state.questions,
                {
                    text: "Question",
                    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
                    correctAnswer: "Answer 1",
                },
            ],
        })),
    setCurrentQuestionIndex: (index: number) => set({ currentQuestionIndex: index }),
    updateQuestion: (index: number, card: CardType) => {
        set((state) => {
            state.questions[index] = card;
            return state;
        });
    },
});

export const useFlashCardStore = create<FlashCardStore>()(
    persist(flashCardSlice, {
        name: 'flashcard-store', // unique name for the storage key
    })
);