import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Facebook, Mail, ArrowUp } from 'lucide-react'; // Twitter সরিয়ে Facebook আনা হয়েছে

const Footer = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: null, y: null, radius: 150 });

    // স্যোশাল লিঙ্ক ডেটা
    const socialLinks = [
        { Icon: Github, href: "https://github.com/prodip2005" },
        { Icon: Linkedin, href: "https://www.linkedin.com/in/prodip-hore-750101337/" },
        { Icon: Facebook, href: "https://www.facebook.com/prodip.shadow.monarch" },
        { Icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=prodiphore2005@gmail.com" },
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = 350;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
                this.color = Math.random() > 0.5 ? '#22d3ee' : '#a855f7';
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                let dx = mouseRef.current.x - this.x;
                let dy = mouseRef.current.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseRef.current.radius) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouseRef.current.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;

                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }
        }

        const init = () => {
            particles = [];
            const numberOfParticles = (canvas.width * canvas.height) / 5000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const connect = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.strokeStyle = particles[a].color;
                        ctx.globalAlpha = 1 - (distance / 100);
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connect();
            requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseRef.current.x = null;
            mouseRef.current.y = null;
        };

        window.addEventListener('resize', resize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        resize(); init(); animate();

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <footer id="footer" className="relative h-75 w-full bg-[#030712] flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
            <canvas ref={canvasRef} className="absolute inset-0 z-0 cursor-crosshair" />

            <div className="relative z-10 flex flex-col items-center text-center select-none">
                <motion.div
                    initial={false}
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.5, 1]
                    }}
                    className="mb-6 overflow-visible flex flex-col items-center will-change-transform"
                >
                    <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter italic pr-12 md:pr-16 inline-block overflow-visible leading-[1.2] whitespace-nowrap">
                        PRODIP
                        <span className="text-transparent pr-4 bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 inline-block ml-2 md:ml-4 overflow-visible">
                            HORE
                        </span>
                    </h2>

                    <div className="flex items-center justify-center gap-2 mt-4 opacity-80">
                        <div className="h-[1px] w-8 bg-cyan-500/50" />
                        <p className="text-cyan-400/50 font-mono text-[8px] md:text-[10px] tracking-[0.6em] uppercase">
                            MERN STACK ARCHITECT
                        </p>
                        <div className="h-[1px] w-8 bg-cyan-500/50" />
                    </div>
                </motion.div>

                {/* Social Links Fixed */}
                <div className="flex gap-8 mb-8 relative z-20">
                    {socialLinks.map((item, i) => (
                        <motion.a
                            key={i}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, color: "#22d3ee" }}
                            className="text-slate-500 transition-all pointer-events-auto"
                        >
                            <item.Icon size={22} />
                        </motion.a>
                    ))}
                </div>

                <p className="text-slate-600 text-[8px] uppercase tracking-[0.4em]">
                    © 2026 Prodip Hore • Intelligence In Motion
                </p>

                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="absolute bottom-8 right-8 p-3 rounded-xl bg-white/5 border border-white/10 text-slate-500 hover:text-cyan-400 hover:border-cyan-400/50 transition-all z-30 pointer-events-auto group"
                >
                    <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>
        </footer>
    );
};

export default Footer;