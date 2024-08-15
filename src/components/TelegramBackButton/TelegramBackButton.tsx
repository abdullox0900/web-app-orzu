import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const TelegramBackButton: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const tg = window.Telegram.WebApp;

    tg.BackButton.show();

    tg.BackButton.onClick(() => {
      navigate(-1);
    });

    // return () => {
    //   tg.BackButton.hide();
    // };
  }, [navigate]);

  return null; // Bu komponent hech qanday UI element qaytarmaydi
};

export default TelegramBackButton;