import { create } from "zustand";

interface ClothesState {
    topImage: string | null;
    bottomImage: string | null;
    hatImage: string | null;
    outerwearImage: string | null;
    shoesImage: string | null;
    personImage: string | null;
    resultImage: string | null;
    isLoading: boolean;
    error: string | null;
    setTopImage: (image: string) => void;
    setBottomImage: (image: string) => void;
    setHatImage: (image: string) => void;
    setOuterwearImage: (image: string) => void;
    setShoesImage: (image: string) => void;
    setPersonImage: (image: string) => void;
    setResultImage: (image: string) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    deleteTopImage: () => void;
    deleteBottomImage: () => void;
    deleteHatImage: () => void;
    deleteOuterwearImage: () => void;
    deleteShoesImage: () => void;
    clearAllImages: () => void;
}

export const useClothesStore = create<ClothesState>((set) => ({
    topImage: null,
    bottomImage: null,
    hatImage: null,
    outerwearImage: null,
    shoesImage: null,
    personImage: null,
    resultImage: null,
    isLoading: false,
    error: null,
    setTopImage: (image) => set({ topImage: image }),
    setBottomImage: (image) => set({ bottomImage: image }),
    setHatImage: (image) => set({ hatImage: image }),
    setOuterwearImage: (image) => set({ outerwearImage: image }),
    setShoesImage: (image) => set({ shoesImage: image }),
    setPersonImage: (image) => set({ personImage: image }),
    setResultImage: (image) => set({ resultImage: image }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    deleteTopImage: () => set({ topImage: null }),
    deleteBottomImage: () => set({ bottomImage: null }),
    deleteHatImage: () => set({ hatImage: null }),
    deleteOuterwearImage: () => set({ outerwearImage: null }),
    deleteShoesImage: () => set({ shoesImage: null }),
    clearAllImages: () =>
        set({
            topImage: null,
            bottomImage: null,
            hatImage: null,
            outerwearImage: null,
            shoesImage: null,
            personImage: null,
            resultImage: null,
            isLoading: false,
            error: null,
        }),
}));
