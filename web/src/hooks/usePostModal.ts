import { is } from "cypress/types/bluebird";
import { create } from "zustand";

interface PostModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isEdit: boolean;
  postDetail?: any;
  onEdit: (postDetail: any) => void;
}

const usePostModal = create<PostModalStore>((set) => ({
  isOpen: false,
  isEdit: false,
  postDetail: null,
  onEdit: (postDetail) => {
    set({ isOpen: true, isEdit: true, postDetail });
  },
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false, isEdit: false });
  },
}));

export default usePostModal;
