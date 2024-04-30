import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    function googleTranslateElementInit() {
      new google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'en,hi,gu' }, 'google_translate_element');
    }

    // Check if google.translate.TranslateElement is available
    if (typeof google !== 'undefined' && typeof google.translate !== 'undefined' && typeof google.translate.TranslateElement !== 'undefined') {
      googleTranslateElementInit();
    } else {
      // Load the Google Translate API script dynamically
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // Cleanup function to remove the script
    return () => {
      const script = document.querySelector('script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div id="google_translate_element"></div>
  );
};

export default GoogleTranslate;