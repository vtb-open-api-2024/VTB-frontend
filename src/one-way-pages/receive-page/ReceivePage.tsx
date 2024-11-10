import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
// import { QRCodeSVG } from 'qrcode.react';

interface iShareAppPG {
  waypoint: string | undefined;
}

export const ReceivePg = ({ waypoint = '/' }: iShareAppPG) => {
  const moveTo = useNavigate();

  return (
    <div className={'page one-way-page' + ' ' + styles.receive}>
      <h1 className={styles.header}>
        <span>Поделитесь</span> Qr
      </h1>
      <img className={styles.qrCode} src="/public/qrCode.svg" alt="" />
      {/* QRCODE GENERATOR */}
      {/* <QRCodeSVG
        value={'test text'}
        size={Math.min(parseInt('128px' as string), parseInt('128px' as string))}
        fgColor={'black'}
        bgColor={'transparent'}
      /> */}
      <p className={styles.paragraph} style={{ textAlign: 'center' }}>
        Чтобы другой человек получил ваши
        <span> контактные данные</span> и смог отправить вам валюту
      </p>
      <button onClick={() => moveTo(waypoint)} className={'button ' + styles.herobutton}>
        Вернуться на главную
      </button>
    </div>
  );
};
