// 📁 src/store/useCommentStore.js
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { useUserStore } from './useUserStore'; // use inside function, not at top-level

const useCommentStore = create((set) => ({
  comments: [],
  loadingComments: false,
  postingComment: false,
  toggleLiking: {},

  fetchCommentsByMovie: async (movieId) => {
    set({ loadingComments: true });
    try {
      const res = await axiosInstance.get(`/comments/movie/${movieId}`);
      const authUser = useUserStore.getState().authUser;

      const formatted = res.data.map((comment) => ({
        id: comment._id,
        user: comment.userId?.username || "Anonymous",
        text: comment.commentText,
        date: comment.createdAt,
        likesCount: comment.likes?.length || 0,
        likedByUser: comment.likes?.some((like) => like.userId === authUser?._id),
      }));

      set({ comments: formatted, loadingComments: false });
    } catch (err) {
      toast.error("Failed to fetch comments",err);
      set({ loadingComments: false });
    }
  },

  addComment: async (movieId, commentText) => {
    if (!commentText.trim()) return;

    const authUser = useUserStore.getState().authUser;
    if (!authUser) {
      toast.error("You must be logged in to comment.");
      return;
    }

    set({ postingComment: true });

    try {
      const res = await axiosInstance.post('/comments', {
        movieId,
        commentText,
      });

      const newComment = res.data;

      set((state) => ({
        comments: [
          {
            id: newComment._id,
            user: authUser.username || "Anonymous",
            text: newComment.commentText,
            date: newComment.createdAt,
            likesCount: 0,
            likedByUser: false,
          },
          ...state.comments,
        ],
        postingComment: false,
      }));
      toast.success("Comment added");
    } catch (err) {
      console.error("Error posting comment:", err);
      toast.error("Failed to add comment");
      set({ postingComment: false });
    }
  },

toggleLike: async (commentId) => {
  const authUser = useUserStore.getState().authUser;
  if (!authUser) {
    toast.error("Login required to like a comment.");
    return;
  }

  set((state) => ({
    toggleLiking: { ...state.toggleLiking, [commentId]: true },
  }));

  try {
    await axiosInstance.post(`/comments/${commentId}/like`);
    set((state) => ({
      comments: state.comments.map((c) =>
        c.id === commentId
          ? {
              ...c,
              likedByUser: !c.likedByUser,
              likesCount: c.likedByUser
                ? c.likesCount - 1
                : c.likesCount + 1,
            }
          : c
      ),
      toggleLiking: { ...state.toggleLiking, [commentId]: false },
    }));
  } catch (err) {
    toast.error("Error toggling like", err);
    set((state) => ({
      toggleLiking: { ...state.toggleLiking, [commentId]: false },
    }));
  }
},

}));

export default useCommentStore;
