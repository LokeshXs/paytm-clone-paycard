"use client";

import { motion, MotionConfig } from "framer-motion";
import { useState, useContext } from "react";
import { MobileNavContext } from "@repo/web/mobilenavcontext";


const AnimatedHamburgerButton = () => {
  const { isOpen, setOpen } = useContext(MobileNavContext);
  // const [active, setActive] = useState(false);
 
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.button
        initial={false}
        onClick={() => {
          // setActive((prev) => !prev)
          setOpen((prev) => {
         

            return !prev;
          });
        }}
        className=" relative h-8 w-8 transition-colors z-[6000] md:hidden "
        animate={isOpen ? "open" : "closed"}
      >
        <motion.span
          style={{
            left: "50%",
            top: "25%",
            x: "-50%",
            y: "-50%",
          }}
          className=" absolute h-1 max-sm:h-[3px] w-8 max-sm:w-7 bg-primary rounded-full"
          variants={{
            open: {
              rotate: ["0deg", "0deg", "45deg"],
              top: ["25%", "50%", "50%"],
            },
            closed: {
              rotate: ["45deg", "0deg", "0deg"],
              top: ["50%", "50%", "25%"],
            },
          }}
        />
        <motion.span
          style={{
            left: "50%",
            top: "50%",
            x: "-50%",
            y: "-50%",
          }}
          className=" absolute h-1 max-sm:h-[3px] w-8 max-sm:w-7 bg-primary rounded-full"
          variants={{
            open: {
              rotate: ["0deg", "0deg", "-45deg"],
            },
            closed: {
              rotate: ["-45deg", "0deg", "0deg"],
            },
          }}
        />
        <motion.span
          style={{
            left: "calc(50% + 8px)",
            bottom: "25%",
            x: "-50%",
            y: "50%",
          }}
          className=" absolute h-1 max-sm:h-[3px] w-3 max-sm:w-2 bg-primary rounded-full"
          variants={{
            open: {
              rotate: ["0deg", "0deg", "45deg"],
              left: "50%",
              bottom: ["25%", "50%", "50%"],
            },
            closed: {
              rotate: ["45deg", "0deg", "0deg"],
              left: "calc(50% + 10px)",
              bottom: ["50%", "50%", "25%"],
            },
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

export default AnimatedHamburgerButton;
