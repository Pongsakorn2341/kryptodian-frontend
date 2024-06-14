import { create } from "zustand";

type useModalStore = {
  isOpen: boolean;
  portId: string | null;
  defaultCoin: string | null;
  onOpen: (portId: string, defaultCoin: string) => void;
  onClose: () => void;
};

export const useAddTransactionModal = create<useModalStore>((set) => ({
  isOpen: false,
  portId: null,
  defaultCoin: null,
  onOpen: (portId, defaultCoin) =>
    set({ isOpen: true, portId: portId, defaultCoin: defaultCoin }),
  onClose: () => set({ isOpen: false, portId: null }),
}));
