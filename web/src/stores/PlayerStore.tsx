import { create } from 'zustand';

interface PlayerState {
    name: string;
    url: string;
    setName: (name: string) => void;
    setUrl: (url: string) => void;
}

const usePlayerStore = create<PlayerState>((set) => ({
    name: "",
    url: "",
    setName: (name: string) => set({ name }),
    setUrl: (url: string) => set({ url }),
}));

export default usePlayerStore;
