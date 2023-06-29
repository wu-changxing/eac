import allparrots from '../../assets/background/allparrots.webp';
import agirl from '../../assets/background/a girl.webp';
import chat3 from '../../assets/background/chat3.webp';
import chat4 from '../../assets/background/chat4.webp';
import chat5 from '../../assets/background/chat5.webp';
import chat6 from '../../assets/background/chat6.webp';
import chat7 from '../../assets/background/chat7.webp';
import chatAnim from '../../assets/background/chatani.webp';
import chatAnim3 from '../../assets/background/chatani3.webp';
import chatroom from '../../assets/background/chatroom.webp';
import cyberpunk from '../../assets/background/cyberpunk.webp';
import cyberpunk1 from '../../assets/background/cyberpunk1.webp';
import handraw from '../../assets/background/handraw.jpeg';
import women from '../../assets/background/women.webp';
import talking from '../../assets/background/talking.webp';
import talking2 from '../../assets/background/talking2.webp';
import titlepage from '../../assets/background/titlepage.webp';

const getRandomBackgroundImage = () => {
    const images = [allparrots, agirl, chat3,
        chat4, chat5, chat6, chat7, chatAnim,
         chatAnim3, chatroom, cyberpunk,
        cyberpunk1, handraw,women, talking, talking2,
        titlepage
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
};

export default getRandomBackgroundImage;
