import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ScienceBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options = useMemo(() => ({
        background: {
            color: { value: "#030712" } // Footer-এর সাথে ম্যাচিং ডার্ক ব্যাকগ্রাউন্ড
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "grab"
                },
            },
            modes: {
                grab: {
                    distance: 180,
                    links: { opacity: 0.8 }
                }
            },
        },
        particles: {
            // শুধুমাত্র সাইয়ান এবং পার্পল কালার কম্বিনেশন
            color: { value: ["#22d3ee", "#a855f7"] },
            links: {
                color: "#22d3ee", // লিন্ক কালার হিসেবে সাইয়ান রাখা হয়েছে যা উজ্জ্বল দেখাবে
                distance: 110,
                enable: true,
                opacity: 0.35,
                width: 1.2,
            },
            move: {
                enable: true,
                speed: 0.7,
                direction: "none",
                random: true,
                outModes: { default: "bounce" }
            },
            number: {
                value: 250,
                density: {
                    enable: true,
                    area: 700
                }
            },
            opacity: {
                value: { min: 0.3, max: 0.7 },
                animation: {
                    enable: true,
                    speed: 1,
                    sync: false
                }
            },
            shape: { type: "circle" },
            size: {
                value: { min: 1, max: 3 }
            },
        },
        detectRetina: true,
    }), []);

    if (init) {
        return (
            <div className="fixed inset-0 -z-10">
                <Particles
                    id="tsparticles"
                    options={options}
                    className="h-full w-full"
                />
            </div>
        );
    }

    return null;
};

export default ScienceBackground;