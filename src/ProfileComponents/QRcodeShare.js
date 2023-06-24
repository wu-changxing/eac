import React from "react";
import { QRCode } from 'react-qrcode-logo';
import macaw6 from "../../assets/macaw6.svg";
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
                <QRCode
                    value={fullRegistrationLink}
                    logoImage={macaw6}
                    logoWidth={20}
                    logoHeight={20}
                    qrSize={150}
                    className="md:logoWidth-30 md:logoHeight-30 md:qrSize-200"
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                />
            </div>
            <button
                onClick={handleClick}
                className="px-3 py-1 rounded bg-blue-500 text-sm md:text-base md:px-4 md:py-2 text-white"
            >
                Download QR Code
            </button>
        </div>
    );
}

export default QRcodeShare;
