"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    particlesJS: any;
    Stats: any;
    pJSDom: any[];
  }
}

export function Particles() {
  const initialized = useRef(false);

  const init = () => {
    if (initialized.current || !window.particlesJS) {
      return;
    }
    initialized.current = true;

    window.particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ["#F9A825", "#2196F3", "#4CAF50", "#FF5252", "#9C27B0", "#E91E63"] },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 },
          image: { src: "img/github.svg", width: 100, height: 100 },
        },
        opacity: {
          value: 1,
          random: false,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 5,
          random: true,
          anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
        },
        line_linked: {
          enable: false,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: "window",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 },
        },
      },
      retina_detect: true,
    });
  };

  useEffect(() => {
    // Cleanup
    return () => {
      if (window.pJSDom && window.pJSDom.length > 0 && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
      }
      initialized.current = false;
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        canvas {
          display: block;
          vertical-align: bottom;
        }
        #particles-js {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 0;
          background-color: #ffffff;
          background-image: url("");
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 50% 50%;
        }
        .count-particles, #stats-widget {
          display: none;
        }
      `}</style>
      <div id="particles-js"></div>

      <Script
        id="particles-js-lib"
        src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
        onLoad={init}
      />
    </>
  );
}
