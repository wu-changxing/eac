import React from "react";
import { QRCode } from 'react-qrcode-logo';
import macaw6 from "../../assests/macaw6.svg";
import * as htmlToImage from 'html-to-image';
import config from "../config";

const QRcodeShare = ({ value }) => {
    const nodeRef = React.useRef(null);
    const handleClick = async () => {
        const dataUrl = await htmlToImage.toPng(nodeRef.current);
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = dataUrl;
        link.click();
    };

    // Generate the full registration link with the recommendation code
    const fullRegistrationLink = `${config.CURRENT_HOST}/#/register/?recommendation_code=${value}`;
    console.log(fullRegistrationLink);

    return (
        <div className="flex flex-col items-center">
            <div ref={nodeRef}>
                <QRCode value={fullRegistrationLink} logoImage={macaw6} logoWidth={30} logoHeight={30} qrSize={200} bgColor="#FFFFFF" fgColor="#000000" />
            </div>
            <button onClick={handleClick} className="mt-2 px-4 py-2 rounded bg-blue-500 text-white">
                Download QR Code
            </button>
        </div>
    );
}

export default QRcodeShare;
