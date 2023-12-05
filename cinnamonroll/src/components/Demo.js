import React from "react";
import Layout from "../components/Layout.js";
import { motion } from "framer-motion";
import OpenAIPromptGenerator from "./OpenAIPromptGenerator.js";
// import PromptGrader from "./PromptGrader.js";

const Demo = () => {
  /**
   * Renders a heading component with animated characters (typing effect)
   *
   * @param props - The component props.
   * @param props.text - The text to be displayed.
   * @param props.className - Additional CSS class for the component.
   * @returns {JSX.Element} The rendered heading component.
   */
  const MyHeading = ({ text, className = "" }) => {
    const characters = text.split("");

    return (
      <div
        className="w-full mx-auto pb-6 mb-14 flex items-center justify-center text-center
            overflow-hidden"
      >
        <h1
          className={`inline-block w-full text-dark font-bold
              text-7xl text-left
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
        <div className="flex items-center justify-between w-full text-white">
          <div className="w-full flex flex-col items-center ">
            <div className="my-4">
              <h1 className="my-0 text-6xl font-bold">
                Project <span className="text-cyan-500">Nudge</span>
              </h1>
              <h2 className="mb-4">...to nudge you in the right direction</h2>
              <MyHeading text="Learn better with Nudge!" className="" />
              <p className="text-left text-1xl text-gray-400">
                <span className="text-bold">
                  How it works - a seamless learning experience with AI!
                </span>
                <br /> 1. Input what you want to learn, and it generates
                questions for you. You answer, and get feedback highlighting
                important terms and linking them to reliable sources.
                <br /> 2. And get upto 10 additional readings using Azure Bing
                Search, offering a comprehensive learning journey in a snap!
              </p>
            </div>
            <OpenAIPromptGenerator />
            {/*<PromptGrader />*/}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Demo;
