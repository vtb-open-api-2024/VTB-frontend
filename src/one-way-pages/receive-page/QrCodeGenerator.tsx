import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
  value: string;
  width?: string | '100%';
  height?: string | '100%';
  primaryColor?: string | 'white';
  backgroundColor?: string | 'transparent';
}

const generateQRCode = ({
  value,
  width = '100%',
  height = '100%',
  primaryColor = 'white',
  backgroundColor = 'transparent',
}: QRCodeProps): JSX.Element => {
  return (
    <div style={{ width, height, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor }}>
      <QRCodeSVG
        value={value}
        size={Math.min(parseInt(width as string), parseInt(height as string))}
        fgColor={primaryColor}
        bgColor={backgroundColor}
      />
    </div>
  );
};

export default generateQRCode;
