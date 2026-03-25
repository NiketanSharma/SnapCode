import { useRef, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { motion, AnimatePresence } from "framer-motion";
import Canvas from "./components/Canvas";
import Feature from "./components/Feature";
import Navbar from "./components/Navbar";
import { GlobelThemeContext } from "./Context/GlobelThemeContext";
import { VisibleContext } from "./Context/VisibleContext";

const MOBILE_BREAKPOINT = 768;

function App() {
  const myRef = useRef(null);
  const [visiblity, setvisiblity] = useState(true);
  const [bgTheme, setbgTheme] = useState("solid");

  const [isMobileView, setIsMobileView] = useState(false);
  const [hasDismissedWarning, setHasDismissedWarning] = useState(false);
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  const popupNodeRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    if (!vantaEffect && window.VANTA) {
      setVantaEffect(
        window.VANTA.CLOUDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          backgroundColor: 0x050505,
          skyColor: 0x101525,
          cloudColor: 0x334466,
          cloudShadowColor: 0x0,
          sunColor: 0x6b5ed9,
          sunGlareColor: 0x6b5ed9,
          sunlightColor: 0x6b5ed9,
        })
      );
    }

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const dismissWarning = () => {
    setHasDismissedWarning(true);
  };

  return (
    <>
      <div
        ref={vantaRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      <VisibleContext.Provider value={{ visiblity, setvisiblity }}>
        <Navbar />

        <CSSTransition
          in={isMobileView && !hasDismissedWarning}
          timeout={300}
          classNames="popup-transition"
          unmountOnExit
          nodeRef={popupNodeRef}
        >
          <div
            ref={popupNodeRef}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-gray-800 text-gray-100 rounded-lg shadow-xl p-6 max-w-sm w-full text-center relative">
              <h2 className="text-lg font-bold mb-3">
                Optimized for Larger Screens
              </h2>
              <p className="mb-4">
                This website is best viewed on a larger screen (desktop or
                tablet).
              </p>
              <button
                onClick={dismissWarning}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              >
                Got It
              </button>
            </div>
          </div>
        </CSSTransition>

        <div className="flex flex-col justify-center items-center min-h-screen px-4 pb-4 pt-16 overflow-hidden">
          <GlobelThemeContext.Provider value={{ bgTheme, setbgTheme }}>
            <motion.div layout transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="flex justify-center items-center w-full mb-0">
              <Canvas sharedRef={myRef} />
            </motion.div>
            
            <AnimatePresence>
              {visiblity && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.95, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, y: 50, scale: 0.95, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mycontainer flex justify-center items-center w-full"
                >
                  <Feature sharedRef={myRef} />
                </motion.div>
              )}
            </AnimatePresence>
          </GlobelThemeContext.Provider>
        </div>
      </VisibleContext.Provider>
    </>
  );
}

export default App;
