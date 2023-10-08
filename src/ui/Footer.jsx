import React from "react";

const Footer = () => {
  return (
    <div
      className="flex items-center justify-between border-b border-stone-200  px-4 py-4 uppercase sm:px-6"
      style={{ backgroundColor: "#D83F31" }}
    >
      <div>
        <span>Kontakta oss: pizzeriachalla@gmail.com</span>
      </div>
      <div>
        <span>
          Av{" "}
          <a href="" className="underline hover:text-white	">
            S.Ö
          </a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
