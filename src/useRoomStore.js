import create from 'zustand';

// Define your room store
const useRoomStore = create((set) => ({
    isAdmin: false,
    isRoomHidden: false,
    videoStatus: false,
    audioStatus: true,
    setIsAdmin: (isAdmin) => set({ isAdmin }),
    setIsRoomHidden: (isRoomHidden) => set({ isRoomHidden }),
    setVideoStatus: (videoStatus) => set({ videoStatus }),
    setAudioStatus: (audioStatus) => set({ audioStatus }),
}));

export default useRoomStore;
