import { create } from "zustand";

interface ClothesState {
    topImage: string | null;
    bottomImage: string | null;
    setTopImage: (image: string) => void;
    setBottomImage: (image: string) => void;
    deleteTopImage: () => void;
    deleteBottomImage: () => void;
}

export const useClothesStore = create<ClothesState>((set) => ({
    topImage: null,
    bottomImage: null,
    setTopImage: (image) => set({ topImage: image }),
    setBottomImage: (image) => set({ bottomImage: image }),
    deleteTopImage: () => set({ topImage: null }),
    deleteBottomImage: () => set({ bottomImage: null }),
}));
