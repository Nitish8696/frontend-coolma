export function googleTranslateElementInit(language) {
        new google.translate.TranslateElement(
          { pageLanguage: language, includedLanguages: 'en,hi,gu' },
          'google_translate_element'
        );
      }
      