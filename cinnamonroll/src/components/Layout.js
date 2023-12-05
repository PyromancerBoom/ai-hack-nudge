import React from "react";

/**
 * Renders a layout component with customizable className and children.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be rendered inside the layout.
 * @param {string} [props.className=""] - The additional CSS class name for the layout.
 * @returns {ReactNode} The rendered layout component.
 */
const Layout = ({ children, className = "" }) => {
  // xl:!p-32
  // lg:!p-24
  // md:!p-16
  // sm:!p-8
  // xs:!p-2
  return (
    <div
      className={`w-full h-full max-w-1000 inline-block py-0 px-64 pt-0 pb-32
    ${className}`}
    >
      {children}
    </div>
  );
};

export default Layout;
