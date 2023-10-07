import { create } from "zustand";

interface PostModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePostModal = create<PostModalStore>((set) => ({
  isOpen: false,
  onOpen: () => {
    console.log("Opening modal");
    set({ isOpen: true });
  },
  onClose: () => {
    console.log("Closing modal");
    set({ isOpen: false });
  },
}));

export default usePostModal;
