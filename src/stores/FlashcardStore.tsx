import { create } from 'zustand'

type CardType = {
    text: string;
    answers: string[];
    correctAnswer: string;
};

interface FlashCardStore {
    classDeckName: string;
    questions: CardType[];
    setDeckName: (deckName: string) => void;
    createQuestion: () => void;
}

export const useFlashCardStore = create<FlashCardStore>((set) => ({
    classDeckName: "",
    questions: [],
    setDeckName: (deckName: string) => set({ classDeckName: deckName }),
    createQuestion: () => set((state) => ({
        questions: [...state.questions, {
            text: "Question",
            answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
            correctAnswer: "Answer 1"
        }]
    }))
}))