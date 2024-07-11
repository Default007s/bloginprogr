import React from 'react'
import heroImg from '../../Images/heroImg.webp'
import './Home.css'
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import HomeInterests from './HomeInterests/HomeInterests'
import HomeSubs from './HomeSubscription/HomeSubs'
import HomeGoodreads from './HomeGoodreads/HomeGoodreads';
import HomeEssays from './HomeEssays/HomeEssays';

export default function Home() {
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#AE4435",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 0,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 30,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <div className='Home'>
        {init && <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />}
        <img className='heroImg' src={heroImg}></img>
        <HomeInterests />
        <HomeEssays/>
        <HomeSubs />
        <HomeGoodreads />
    </div>
  )
}
