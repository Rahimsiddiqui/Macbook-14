import { create } from "zustand";

const useMacbookStore = create((set) => ({
  color: "#e3e3e3",
  setColor: (color) => set({ color }),

  scale: 0.08,
  setScale: (scale) => set({ scale }),

  reset: () =>
    set({
      color: "#e3e3e3",
      scale: 0.08,
    }),
}));

export default useMacbookStore;
