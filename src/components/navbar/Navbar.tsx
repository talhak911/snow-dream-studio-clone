import React, { useState, useEffect } from "react";
import Image from "next/image";
const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-5 z-[999] right-5 px-6 py-3  text-lg font-bold text-white rounded-md"
        >
          <Image src="/menu.svg" alt="Menu" width={24} height={24} />
        </button>
      )}

      {
        <div
          className={`fixed top-0 left-0 z-[9999] w-full h-[100dvh] bg-secondary flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {/* Close Button */}
          <button
            type="button"
            aria-label="Close Menu"
            className="absolute right-5 top-5 size-11 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <div className="w-[32px] absolute right-0 top-2 before:absolute before:rotate-[45deg] before:left-[15px] before:content-[''] before:h-[33px] before:w-[6px] before:bg-[#EF2493]"></div>
            <div className="w-[32px] absolute right-0 top-2 after:rotate-[-45deg] after:absolute after:left-[15px] after:content-[''] after:h-[33px] after:w-[6px] after:bg-[#EF2493]"></div>
          </button>

          {/* Logo */}
          <div className="mt-16 mb-16">
            <div className="bg-sky-500 px-4 py-2 text-white font-bold text-sm uppercase">
              snow
              <br />
              dream
              <br />
              studios
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex sm:flex-row flex-col items-center justify-center">
            <div className="bg-primary text-white px-12 py-3 text-lg font-bold">
              Home
            </div>

            {[
              "Studio",
              "Work",
              "Services",
              "Career",
              "Contact Us",
              "Blogs",
            ].map((item, index) => (
              <React.Fragment key={index}>
                <div className="h-10 w-px bg-primary mx-2 hidden sm:block"></div>
                <div className="text-white text-lg px-6 py-3 hover:bg-primary cursor-pointer">
                  {item}
                </div>
              </React.Fragment>
            ))}
          </nav>
        </div>
      }
    </div>
  );
};

export default NavBar;
