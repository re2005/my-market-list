import React, { useState } from 'react';
import CloseIcon from '@/assets/close.svg';
import ShareIcon from '@/assets/share.svg';

interface UiQrCodeProps {
  user: {
    uid: string;
    email: string;
  };
}

const UiQrCode: React.FC<UiQrCodeProps> = ({ user }) => {
  const [isQrCodeVisible, setIsQrCodeVisible] = useState(false);
  const qrCodeElement = document.getElementById('qr-code') as HTMLDivElement;

  function closeQrCode() {
    if (qrCodeElement) {
      qrCodeElement.innerHTML = '';
    }
    setIsQrCodeVisible(false);
  }

  function shareQrCode() {
    const options = {
      width: 200,
      height: 200,
      type: 'svg',
      data: `https://mymarketlist.vercel.app?friend=${user.uid};${encodeURIComponent(user.email)}`,
      image: 'https://mymarketlist.vercel.app/my-market-list-logo.svg',
      dotsOptions: {
        type: 'rounded',
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 2,
        imageSize: 0.3,
      },
    };
    import('qr-code-styling').then(({ default: QRCodeStyling }) => {
      const qrCode = new QRCodeStyling(options as any);
      if (qrCodeElement) {
        qrCodeElement.innerHTML = '';
        qrCode.append(qrCodeElement);
        setIsQrCodeVisible(true);
      }
    });
  }

  return (
    <div className="flex flex-col gap-2" id="qr-share">
      <button
        className="text-xs border px-2 p-1 rounded-2xl flex items-center gap-3 justify-center hover:bg-emerald-400"
        onClick={() => shareQrCode()}
      >
        <ShareIcon className="w-4 h-4 text-gray-500" /> Share list
      </button>
      <div id="qr-code" />
      {isQrCodeVisible && (
        <button onClick={() => closeQrCode()} className="flex items-center text-sm gap-2">
          <CloseIcon className="h-5 w-5 text-gray-500" /> CLOSE
        </button>
      )}
    </div>
  );
};

export default UiQrCode;
