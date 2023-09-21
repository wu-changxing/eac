import create from 'zustand';

const useRoomStore = create((set) => ({
    isAdmin: false,
    isRoomHidden: false,
    videoStatus: false,
    audioStatus: false,
    roomId: null,
    roomName: null,
    users: [],
    unreadMessages: [],
    showChatBox: false, // Added showChatBox
    setShowChatBox: (state) => set({ showChatBox: state }),  // Added setShowChatBox
    setUsers: (users) => set({ users }),
    setIsAdmin: (isAdmin) => set({ isAdmin }),
    setIsRoomHidden: (isRoomHidden) => set({ isRoomHidden }),
    setVideoStatus: (videoStatus) => set({ videoStatus }),
    setAudioStatus: (audioStatus) => set({ audioStatus }),
    setRoomId: (roomId) => set({ roomId }),
    setRoomName: (roomName) => set({ roomName }),
    setUnreadMessages: (unreadMessages) => set({ unreadMessages }),
    addUnreadMessage: (newMessage) => set((state) => ({
        unreadMessages: [...state.unreadMessages, newMessage]
    })),
    removeUnreadMessage: (index) => set((state) => ({
        unreadMessages: state.unreadMessages.filter((_, i) => i !== index)
    })),
}));

export default useRoomStore;
