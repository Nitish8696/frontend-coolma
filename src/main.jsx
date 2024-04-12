import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: 'hi',                              // language to use
    fallbackLng: 'hi',                       // fallback language
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json' // Path to translation files
    }
  });

// Update ReactDOM.render to use createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
