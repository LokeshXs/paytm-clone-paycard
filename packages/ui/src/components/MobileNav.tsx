"use client";

import Link from "next/link";
import { useContext } from "react";
import { MobileNavContext } from "@repo/web/mobilenavcontext";
import { motion, AnimatePresence } from "framer-motion";

const MobileNav = () => {
  const { isOpen, setOpen } = useContext(MobileNavContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ top: "100%", opacity: 0 }}
          animate={{ top: 0, opacity: 1 }}
          exit={{ top: "100%", opacity: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="fixed h-screen  w-screen bg-primary-foreground text-primary flex justify-center items-center left-0 z-[5000] overflow-y-auto  "
        >
          <div className="  p-8 max-sm:p-6 ">
            <motion.ul
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.3, // Delay between each li element
                  },
                },
              }}
              initial="hidden"
              animate={isOpen ? "visible" : ""}
              exit="hidden"
            >
              <motion.li
                className="mt-8 text-4xl font-bold text-center"
                onClick={() => {
                  setOpen(false);
                }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                <Link href="/">Home</Link>
              </motion.li>
            </motion.ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
