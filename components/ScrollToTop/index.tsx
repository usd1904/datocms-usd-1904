"use client";

import { SiteLocale } from "@/graphql/generated";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthenticationModal from "../Header/AuthenticationModal";
import SuccessPopUp from "../Header/SuccessPopUp";

type Props = {
  lng: SiteLocale;
  isDraft: boolean;
};

export default function ScrollToTop({ lng, isDraft }: Props) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  async function toggleDraft() {
    if (isDraft) {
      await fetch("/api/draft/disable");
      router.refresh();
    } else setModalOpen(true);
  }

  const triggerSuccessToast = () => {
    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
    }, 5000);
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-8 right-8 z-[99]"
          >
            <AnimatePresence>
              {successToast && (
                <motion.div
                  className="absolute bottom-0 right-0 z-50 w-[500px]"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.15 }}
                >
                  <SuccessPopUp setSuccessToast={setSuccessToast} />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {modalOpen && (
                <motion.div
                  className="absolute bottom-0 right-0 z-50 w-[400px]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.15 }}
                >
                  <AuthenticationModal
                    setModalOpen={setModalOpen}
                    refresh={router.refresh}
                    triggerSuccessToast={triggerSuccessToast}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
