import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights.jsx";
import { features, featureSequence } from "../constants/index.js";
import clsx from "clsx";
import { Suspense, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import MacbookModel from "./models/Macbook.jsx";
import { useMediaQuery } from "react-responsive";
import useMacbookStore from "../store/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ModelScroll = () => {
  const groupRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const { setTexture } = useMacbookStore();

  // Pre-load all feature videos during component mount
  useEffect(() => {
    featureSequence.forEach((feature) => {
      const v = document.createElement("video");

      Object.assign(v, {
        src: feature.videoPath,
        muted: true,
        playsInline: true,
        preload: "auto",
        crossOrigin: "anonymous",
      });

      v.load();
    });
  }, []);

  useGSAP(() => {
    // 3D MODEL ROTATION ANIMATION
    const modelTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
      },
    });

    // SYNC THE FEATURE CONTENT
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top center",
        end: "bottom  top",
        scrub: 1,
      },
    });

    // 3D SPIN
    if (groupRef.current) {
      modelTimeline.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        ease: "power1.inOut",
      });
    }

    // Content & Texture Sync
    const featureCount = 5;
    for (let i = 1; i <= featureCount; i++) {
      timeline
        .call(() => setTexture(`/videos/feature-${i}.mp4`))
        .to(`.box${i}`, { opacity: 1, y: 0, duration: 0.5 });

      if (isMobile && i < featureCount) {
        // Hide current box before next one shows on mobile
        timeline.to(`.box${i}`, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          delay: 0.8,
        });
      } else {
        timeline.to({}, { duration: 1 }); // Desktop spacing
      }
    }
  }, [isMobile]);

  return (
    <group ref={groupRef}>
      <Suspense
        fallback={
          <Html>
            <h1 className="text-white text-3xl uppercase">Loading...</h1>
          </Html>
        }
      >
        <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
      </Suspense>
    </group>
  );
};

const Features = () => {
  return (
    <section id="features" className="relative h-[200vh] bg-black text-white">
      {/* Sticky Canvas */}
      <div className="sticky top-0 h-screen w-full">
        <Canvas
          id="f-canvas"
          camera={{ position: [0, 0, 8], fov: 45 }}
          className="h-screen w-full"
        >
          <StudioLights />
          <ambientLight intensity={0.5} />
          <ModelScroll />
        </Canvas>

        {/* Overlay Content */}
        <div className="pointer-events-none absolute inset-0">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={clsx("box", `box${index + 1}`, feature.styles)}
            >
              <img
                src={feature.icon}
                alt={feature.highlight}
                className="mb-4 size-12"
              />

              <p className="max-w-sm text-xl leading-relaxed">
                <span className="font-semibold text-white">
                  {feature.highlight}
                </span>{" "}
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
