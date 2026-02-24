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
  const animationFrameId = useRef<number>();

  const init = () => {
    if (initialized.current || !window.particlesJS || !window.Stats) {
      return;
    }
    initialized.current = true;

    window.particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ff0000" },
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
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: "canvas",
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

    const stats = new window.Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "5px";
    stats.domElement.style.top = "5px";
    stats.domElement.id = "stats-widget";
    document.body.appendChild(stats.domElement);

    const count_particles = document.querySelector(".js-count-particles");
    const update = function () {
      stats.begin();
      stats.end();
      if (
        window.pJSDom &&
        window.pJSDom[0]?.pJS?.particles?.array &&
        count_particles
      ) {
        (
          count_particles as HTMLElement
        ).innerText = window.pJSDom[0].pJS.particles.array.length.toString();
      }
      animationFrameId.current = requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  useEffect(() => {
    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      const statsWidget = document.getElementById("stats-widget");
      if (statsWidget) {
        statsWidget.remove();
      }
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
          background-color: #b61924;
          background-image: url("");
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 50% 50%;
        }
        .count-particles {
          background: #000022;
          position: absolute;
          top: 53px;
          left: 5px;
          width: 80px;
          color: #13e8e9;
          font-size: 0.8em;
          text-align: left;
          text-indent: 4px;
          line-height: 14px;
          padding-bottom: 2px;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: bold;
          border-radius: 0 0 3px 3px;
          user-select: none;
          z-index: 1;
        }
        .js-count-particles {
          font-size: 1.1em;
        }
        #stats-widget {
          user-select: none;
          margin-top: 5px;
          margin-left: 5px;
          border-radius: 3px 3px 0 0;
          overflow: hidden;
          z-index: 1;
        }
      `}</style>
      <div id="particles-js"></div>
      <div className="count-particles">
        <span className="js-count-particles">--</span> particles
      </div>

      <Script
        id="particles-js-lib"
        src="http://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
        onLoad={init}
      />
      <Script
        id="stats-js-lib"
        src="http://threejs.org/examples/js/libs/stats.min.js"
        onLoad={init}
      />
    </>
  );
}
