import React from "react";

const Layout = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full h-full max-w-1000 inline-block bg-dark py-0 px-64 pt-0
    xl:!p-32
    lg:!p-24
    md:!p-16
    sm:!p-8
    xs:!p-2
    ${className}`}
    >
      {children}
    </div>
  );
};

export default Layout;
