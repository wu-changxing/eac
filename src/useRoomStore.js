import create from 'zustand';

// Define your room store
const useRoomStore = create((set) => ({
    isAdmin: false,
    isRoomHidden: false,
    setIsAdmin: (isAdmin) => set({ isAdmin }),
    setIsRoomHidden: (isRoomHidden) => set({ isRoomHidden }),
}));

export default useRoomStore;
