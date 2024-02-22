import { create } from "zustand";

type IPostStore = {
  posts: any[];
  setPosts: (posts: any[]) => void;

};

export const usePostStore = create<IPostStore>((set) => {
  return {
    posts: [],
    setPosts: (posts: any[]) => {
        set({ posts });
      },

  };
});
