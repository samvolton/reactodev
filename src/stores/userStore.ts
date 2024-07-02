// stores/userStore.ts
import {create} from 'zustand';

type User = {
  id: number;
  name: string;
  email: string;
};

type UserStore = {
  currentUser: User | null;
  updateCurrentUser: (user: User) => void;
};

const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  updateCurrentUser: (user) => set(() => ({ currentUser: user })),
}));

export default useUserStore;