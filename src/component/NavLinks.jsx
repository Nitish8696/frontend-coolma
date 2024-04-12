import React, { useState } from "react";
import { links } from "../demo/Mylinks";

const NavLinks = () => {
        const [openSubmenu, setOpenSubmenu] = useState(""); // State to track which submenu is open

        const toggleSubmenu = (name) => {
          setOpenSubmenu(openSubmenu === name ? "" : name); // Toggle the submenu based on its current state
        };
      
  return (
    <>
      {/* Desktop view */}
      <div className="hidden  sm:flex">
        {links.map((link, index) => (
          <div key={index} className="px-3 md:cursor-pointer group relative flex items-center">
            <div>{link.name}</div> {/* Wrapping link.name in a div */}
            {link.submenu && (
              <div className="absolute top-[30px] w-[800px] left-[-350px] hidden group-hover:md:block hover:md:block shadow-2xl">
                <div className="bg-white p-5 grid grid-cols-5 gap-10 mt-5">
                  {link.sublinks.map((mysublinks, subIndex) => (
                    <div key={subIndex}>
                      <h1 className="text-lg font-semibold">{mysublinks.Head}</h1>
                      {mysublinks.sublink.map((slink, subSubIndex) => (
                        <li key={subSubIndex} className="text-sm text-gray-600 my-2.5">
                          <div className="hover:text-primary">{slink.name}</div>
                        </li>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile view */}
      <>
      <style>
        {`
          .submenu {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
          }
          .submenu.open {
            max-height: 200px; /* Adjust the height as needed */
          }
        `}
      </style>
      <div className="sm:hidden block">
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <div className="text-2xl" onClick={() => toggleSubmenu(link.name)}>
                {link.name}
              </div>
              {/* Render the submenu only if its name matches the openSubmenu state */}
              <ul className={`ml-4 submenu ${openSubmenu === link.name ? "open" : ""}`}>
                {link.sublinks.map((sublink, subIndex) => (
                  <li key={subIndex}>{sublink.Head}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
    </>
  );
};

export default NavLinks;
