import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

function PopUp({ onClose, onLanguageChange }) {
  const [language, setLanguage] = useState("en"); // Default language is English

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    onLanguageChange(selectedLanguage); // Notify parent component about the language change
    onClose();
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 sm:mt-[0px] ">
        <div className="bg-white px-4 mx-8 sm:px-8 sm:py-3 rounded-md shadow-lg w-full z-[999 sm:max-w-md h-auto sm:h-[300px] relative">
          <RxCross2
            className="absolute top-2 right-2 text-[24px] cursor-pointer"
            onClick={onClose}
          />
          <form
            onClick={onClose}
            className="flex flex-col  sm:gap-2 sm:py-1 py-4 px-12] z-[999]"
          >
            <div id="google_translate_element"></div> {/* Google Translate Element */}
            <div className="flex sm:mt-[50px] ">
              <div className="flex flex-col gap-5 ">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="hindi"
                    name="language"
                    value="hi"
                    checked={language === "hi"}
                    onChange={() => handleLanguageChange("hi")}
                  />
                  <label htmlFor="hindi" className="text-[16px] font-[500]">
                    Hindi
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="english"
                    name="language"
                    value="en"
                    checked={language === "en"}
                    onChange={() => handleLanguageChange("en")}
                  />
                  <label htmlFor="hindi" className="text-[16px] font-[500]">
                    English
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="Gujarati"
                    name="language"
                    value="gu"
                    checked={language === "gu"}
                    onChange={() => handleLanguageChange("gu")}
                  />
                  <label htmlFor="hindi" className="text-[16px] font-[500]">
                  Gujarati
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-4 col-span-2">
              <button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold text-lg py-3 rounded-lg transition duration-300"
              >
                Let's Go 🕺
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
