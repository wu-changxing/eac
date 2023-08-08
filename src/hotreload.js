export const enableHotReload = () => {
    // if (process.env.NODE_ENV === 'development') {
        // Parcel's websocket sends messages every ctrl + s, even though it ONLY works on index.html for now.
        // We'll listen to it to do a whole page refresh.
        const parcelSocket = new WebSocket("ws://localhost:3001/"); // Or whatever port you run parcel on
        parcelSocket.onmessage = () => {
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        // };
    }
};