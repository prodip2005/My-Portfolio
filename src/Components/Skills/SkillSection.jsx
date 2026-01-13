import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { motion } from 'framer-motion';
import { Terminal, Server, Layout, Cpu } from 'lucide-react';

const SKILLS_DATA = {
    languages: {
        title: "Languages",
        icon: <Terminal className="text-yellow-400 w-6 h-6" />,
        glow: "from-yellow-400/20 to-orange-500/20",
        glowColor: "rgba(234, 179, 8, 0.5)",
        items: [{ name: 'C', color: '#64748b' }, { name: 'C++', color: '#00599C' }, { name: 'Java', color: '#f89820' }, { name: 'JS', color: '#F7DF1E' }]
    },
    backend: {
        title: "Backend",
        icon: <Server className="text-blue-400 w-6 h-6" />,
        glow: "from-blue-400/20 to-indigo-500/20",
        glowColor: "rgba(59, 130, 246, 0.5)",
        items: [{ name: 'Node.js', color: '#68A063' }, { name: 'Express', color: '#828282' }, { name: 'Firebase', color: '#ffa000' }]
    },
    frontend: {
        title: "Frontend",
        icon: <Layout className="text-cyan-400 w-6 h-6" />,
        glow: "from-cyan-400/20 to-blue-500/20",
        glowColor: "rgba(34, 211, 238, 0.5)",
        items: [{ name: 'React', color: '#61DAFB' }, { name: 'Next.js', color: '#ffffff' }, { name: 'Tailwind', color: '#38bdf8' }]
    },
    intelligence: {
        title: "Data & ML",
        icon: <Cpu className="text-purple-400 w-6 h-6" />,
        glow: "from-purple-400/20 to-pink-500/20",
        glowColor: "rgba(168, 85, 247, 0.5)",
        items: [{ name: 'ML', color: '#a855f7' }, { name: 'MongoDB', color: '#47A248' }, { name: 'Git', color: '#F05032' }, { name: 'GitHub', color: '#71717a' }]
    }
};

const SkillSection = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(Matter.Engine.create());
    const containerRef = useRef(null);

    useEffect(() => {
        const engine = engineRef.current;
        const container = containerRef.current;
        const scene = sceneRef.current;

        // Mobile check: Desktop/Tablet na hole physics start hobe na
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

        const allSkillItems = Object.values(SKILLS_DATA).flatMap(cat => cat.items);
        const balls = allSkillItems.map((skill, i) => {
            const visualRadius = 27;
            const collisionRadius = visualRadius + 3;

            return Matter.Bodies.circle(width / 2 + (Math.random() * 40 - 20), -50 - (i * 40), collisionRadius, {
                restitution: 0.6,
                friction: 0.1,
                render: {
                    sprite: {
                        texture: createNeonBubble(skill.name, skill.color, visualRadius, false)
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
    }, []);

    const createNeonBubble = (text, color, radius, isMobile) => {
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

    return (
        <section id='skill' className="relative min-h-screen py-24 bg-transparent flex flex-col items-center justify-center overflow-hidden">
            <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-x-20 items-center">

                <div className="space-y-8 order-2 lg:order-1">
                    <CategoryCard data={SKILLS_DATA.languages} />
                    <CategoryCard data={SKILLS_DATA.backend} />
                </div>

                {/* Physics Container: Hidden on mobile (hidden), shown on Large screens (lg:flex) */}
                <div className="hidden lg:flex flex-col items-center order-1 lg:order-2">
                    <div className="relative w-full max-w-[300px] aspect-square sm:max-w-[400px] md:max-w-[480px]" ref={containerRef}>
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 w-full text-center">
                            <h2 className="text-white font-black text-2xl md:text-4xl italic tracking-tighter uppercase">
                                SKILL <span className="text-cyan-400 opacity-50">VAULT</span>
                            </h2>
                        </div>

                        {/* Glass Bowl Visual */}
                        <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-2xl rounded-b-[150px] md:rounded-b-[240px] border-b border-x border-white/10 shadow-2xl z-10 pointer-events-none" />

                        {/* Energy Glow Background */}
                        <div className="absolute inset-0 rounded-b-[240px] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-30" />
                        </div>

                        {/* Physics Canvas */}
                        <div ref={sceneRef} className="absolute inset-0 z-20 overflow-hidden rounded-b-[150px] md:rounded-b-[240px]" />
                    </div>
                </div>

                {/* Mobile Title: Displayed only on small screens because the main vault is hidden */}
                <div className="lg:hidden text-center order-1">
                    <h2 className="text-white font-black text-3xl italic tracking-tighter uppercase">
                        SKILL <span className="text-cyan-400 opacity-50">VAULT</span>
                    </h2>
                </div>

                <div className="space-y-8 order-3">
                    <CategoryCard data={SKILLS_DATA.frontend} />
                    <CategoryCard data={SKILLS_DATA.intelligence} />
                </div>
            </div>
        </section>
    );
};

const CategoryCard = ({ data }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="group relative overflow-hidden bg-white/[0.03] backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 transition-all duration-300"
    >
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${data.glow} blur-[50px] -z-10`} />
        <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10" style={{ filter: `drop-shadow(0 0 8px ${data.glowColor})` }}>
                    {data.icon}
                </div>
                <h3 className="text-white font-bold uppercase tracking-widest text-[10px] opacity-70">{data.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {data.items.map(skill => (
                    <span key={skill.name} className="text-[9px] md:text-[11px] font-medium text-white/60 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">{skill.name}</span>
                ))}
            </div>
        </div>
    </motion.div>
);

export default SkillSection;