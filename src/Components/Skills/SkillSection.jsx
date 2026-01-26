import React, { useState, useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { motion } from 'framer-motion';
import { Terminal, Server, Layout, Cpu } from 'lucide-react';
import useAxios from '../../hooks/useAxios'; // আপনার useAxios হুকের পাথ

// আইকন ম্যাপিং অবজেক্ট
const iconMap = {
    Terminal: <Terminal className="text-yellow-400 w-6 h-6" />,
    Server: <Server className="text-blue-400 w-6 h-6" />,
    Layout: <Layout className="text-cyan-400 w-6 h-6" />,
    Cpu: <Cpu className="text-purple-400 w-6 h-6" />
};

const SkillSection = () => {
    const [skillsData, setSkillsData] = useState(null);
    const axios = useAxios(); // হুক ব্যবহার করে axios ইনস্ট্যান্স নেওয়া
    const sceneRef = useRef(null);
    const engineRef = useRef(Matter.Engine.create());
    const containerRef = useRef(null);

    // ১. MongoDB থেকে এপিআই এর মাধ্যমে ডাটা ফেচ করা
    useEffect(() => {
        axios.get('/skills')
            .then(res => {
                // MongoDB থেকে ডাটা findOne() করলে সরাসরি অবজেক্ট আসবে,
                // আর find().toArray() করলে অ্যারে আসবে। তাই ডাইনামিক চেক রাখা ভালো।
                const data = Array.isArray(res.data) ? res.data[0] : res.data;
                setSkillsData(data);
            })
            .catch(err => console.error("Error loading skills from DB:", err));
    }, [axios]);

    // ২. ফিজিক্স ইঞ্জিন লজিক (ডাটা লোড হওয়ার পর চলবে)
    useEffect(() => {
        if (!skillsData) return;

        const engine = engineRef.current;
        const container = containerRef.current;
        const scene = sceneRef.current;

        if (!container || !scene || window.innerWidth < 1024) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        const render = Matter.Render.create({
            element: scene,
            engine: engine,
            options: {
                width,
                height,
                background: 'transparent',
                wireframes: false,
                pixelRatio: window.devicePixelRatio
            }
        });

        const mouseBody = Matter.Bodies.circle(0, 0, 40, {
            isStatic: true, render: { visible: false }
        });

        const wallOptions = { isStatic: true, render: { visible: false }, friction: 0.05, restitution: 0.4 };

        const bowlWalls = [
            Matter.Bodies.rectangle(width * 0.2, height * 0.7, width, 40, {
                isStatic: true, angle: Math.PI / 3.5, ...wallOptions
            }),
            Matter.Bodies.rectangle(width * 0.8, height * 0.7, width, 40, {
                isStatic: true, angle: -Math.PI / 3.5, ...wallOptions
            }),
            Matter.Bodies.rectangle(width / 2, height - 25, width * 0.4, 40, wallOptions),
            Matter.Bodies.rectangle(-10, height / 2, 20, height, wallOptions),
            Matter.Bodies.rectangle(width + 10, height / 2, 20, height, wallOptions)
        ];

        // ডাটাবেস থেকে পাওয়া স্কিল আইটেমগুলো ফ্ল্যাট করা
        const allSkillItems = Object.values(skillsData).flatMap(cat => cat.items || []);

        const balls = allSkillItems.map((skill, i) => {
            const visualRadius = 27;
            const collisionRadius = visualRadius + 3;

            return Matter.Bodies.circle(width / 2 + (Math.random() * 40 - 20), -50 - (i * 40), collisionRadius, {
                restitution: 0.6,
                friction: 0.1,
                render: {
                    sprite: {
                        texture: createNeonBubble(skill.name, skill.color, visualRadius)
                    }
                }
            });
        });

        const handleInteraction = (e) => {
            const rect = scene.getBoundingClientRect();
            let x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
            let y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
            Matter.Body.setPosition(mouseBody, { x, y });
        };

        const handleEnd = () => Matter.Body.setPosition(mouseBody, { x: -2000, y: -2000 });

        container.addEventListener('mousemove', handleInteraction);
        container.addEventListener('mouseleave', handleEnd);

        Matter.World.add(engine.world, [...bowlWalls, ...balls, mouseBody]);
        Matter.Runner.run(Matter.Runner.create(), engine);
        Matter.Render.run(render);

        return () => {
            container.removeEventListener('mousemove', handleInteraction);
            container.removeEventListener('mouseleave', handleEnd);
            Matter.Render.stop(render);
            Matter.World.clear(engine.world);
            Matter.Engine.clear(engine);
            if (render.canvas) render.canvas.remove();
        };
    }, [skillsData]);

    const createNeonBubble = (text, color, radius) => {
        const canvas = document.createElement('canvas');
        const size = 120; canvas.width = size; canvas.height = size;
        const ctx = canvas.getContext('2d');
        const centerX = size / 2; const centerY = size / 2;

        ctx.shadowBlur = 12; ctx.shadowColor = color;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = `bold 11px sans-serif`;
        ctx.textAlign = "center"; ctx.fillText(text, centerX, centerY + 4);

        return canvas.toDataURL();
    };

    if (!skillsData) return null;

    return (
        <section id='skill' className="relative min-h-screen py-24 bg-transparent flex flex-col items-center justify-center overflow-hidden">
            <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-x-20 items-center">

                <div className="space-y-8 order-2 lg:order-1">
                    <CategoryCard data={skillsData.languages} />
                    <CategoryCard data={skillsData.backend} />
                </div>

                <div className="hidden lg:flex flex-col items-center order-1 lg:order-2">
                    <div className="relative w-full max-w-75 aspect-square sm:max-w-100 md:max-w-120" ref={containerRef}>
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 w-full text-center">
                            <h2 className="text-white font-black text-2xl md:text-4xl italic tracking-tighter uppercase">
                                SKILL <span className="text-cyan-400 opacity-50">VAULT</span>
                            </h2>
                        </div>
                        <div className="absolute inset-0 bg-white/3 backdrop-blur-2xl rounded-b-[150px] md:rounded-b-[240px] border-b border-x border-white/10 shadow-2xl z-10 pointer-events-none" />
                        <div className="absolute inset-0 rounded-b-[240px] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-30" />
                        </div>
                        <div ref={sceneRef} className="absolute inset-0 z-20 overflow-hidden rounded-b-[150px] md:rounded-b-[240px]" />
                    </div>
                </div>

                <div className="lg:hidden text-center order-1">
                    <h2 className="text-white font-black text-3xl italic tracking-tighter uppercase">
                        SKILL <span className="text-cyan-400 opacity-50">VAULT</span>
                    </h2>
                </div>

                <div className="space-y-8 order-3">
                    <CategoryCard data={skillsData.frontend} />
                    <CategoryCard data={skillsData.intelligence} />
                </div>
            </div>
        </section>
    );
};

const CategoryCard = ({ data }) => {
    if (!data) return null;
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden bg-white/3 backdrop-blur-xl p-6 rounded-4xl border border-white/10 transition-all duration-300"
        >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${data.glow} blur-[50px] -z-10`} />
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10" style={{ filter: `drop-shadow(0 0 8px ${data.glowColor})` }}>
                        {iconMap[data.iconName]}
                    </div>
                    <h3 className="text-white font-bold uppercase tracking-widest text-[10px] opacity-70">{data.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {data.items?.map(skill => (
                        <span key={skill.name} className="text-[9px] md:text-[11px] font-medium text-white/60 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">{skill.name}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default SkillSection;