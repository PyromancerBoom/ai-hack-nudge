import React from "react";
import Layout from "../components/Layout.js";
import TextBoxInput from "../components/TextBoxInput";
import { motion } from "framer-motion";

const Demo = () => {
  const MyHeading = ({ text, className = "" }) => {
    const characters = text.split("");

    return (
      <div
        className="w-full mx-auto py-3 flex items-center justify-center text-center
            overflow-hidden"
      >
        <h1
          className={`inline-block w-full text-dark font-bold
              text-6xl text-left
              sm:!py-0
              xl:!text-4xl
              lg:!text-center
              lg:!text-4xl
              md:!text-3xl
              sm:!text-2xl ${className}`}
        >
          {characters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                opacity: { duration: 0.5, delay: index * 0.04 },
                y: { type: "spring", duration: 0.5 },
              }}
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>
      </div>
    );
  };

  return (
    <div>
      <Layout>
        <div className="flex items-center justify-between w-full">
          {/* flex flex-col OR w-1/2 */}

          <div className="w-full flex flex-col items-center ">
            <MyHeading
              text="Take you understanding to the next level "
              className=""
            />

            <TextBoxInput />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Demo;
