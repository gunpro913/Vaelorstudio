import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const stylesList = [
  { 
    id: '01', 
    title: 'GLASSMORPHISM', 
    desc: 'TRANSLUCENT DEPTH', 
    story: 'Utilizing background blurs and semi-transparent layers to create a sense of verticality, frosted elegance, and atmospheric light.', 
    type: 'glass',
    coord: 'SYS: RENDER_BLUR' 
  },
  { 
    id: '02', 
    title: 'BRUTALISM', 
    desc: 'RAW STRUCTURE', 
    story: 'Stripped back, high-contrast, and unapologetically bold. Exposing the structural framework of the web with stark geometry.', 
    type: 'brutal',
    coord: 'SYS: BORDER_MAX' 
  },
  { 
    id: '03', 
    title: 'KINETIC', 
    desc: 'MOTION TYPOGRAPHY', 
    story: 'Where text becomes the interface. Fluid, continuous, and reacting to the user\'s momentum to create living layouts.', 
    type: 'kinetic',
    coord: 'SYS: FLOW_STATE' 
  },
  { 
    id: '04', 
    title: 'EDITORIAL', 
    desc: 'CURATED ELEGANCE', 
    story: 'Guided by negative space, classical proportions, and cinematic pacing. A timeless approach to digital storytelling.', 
    type: 'editorial',
    coord: 'SYS: MASK_REVEAL' 
  },
  { 
    id: '05', 
    title: 'GLITCH', 
    desc: 'SYSTEM ERROR', 
    story: 'Embracing the beauty of digital decay. Chromatic aberration, data moshing, and fractured geometry as an aesthetic choice.', 
    type: 'glitch',
    coord: 'SYS: OVERRIDE' 
  },
  { 
    id: '06', 
    title: 'SPATIAL', 
    desc: 'VOLUMETRIC UI', 
    story: 'Interfaces that exist in three dimensions. Layered, depth-aware, and responsive to spatial tracking.', 
    type: 'spatial',
    coord: 'SYS: Z_INDEX_MAX' 
  },
  { 
    id: '07', 
    title: 'MINIMALISM', 
    desc: 'ABSOLUTE REDUCTION', 
    story: 'The removal of the non-essential. Relying entirely on perfect proportions, micro-typography, and vast negative space.', 
    type: 'minimal',
    coord: 'SYS: VOID_SPACE' 
  }
];

function StyleDemo({ type }: { type: string }) {
  if (type === 'glass') {
    return (
      <div className="w-full h-full relative bg-gradient-to-br from-aer-charcoal via-[#1a2a3a] to-aer-charcoal flex items-center justify-center p-8 overflow-hidden">
         <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-aer-blue/20 rounded-full blur-3xl"></div>
         <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
         <div className="relative w-full max-w-sm aspect-[4/3] backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl flex flex-col justify-between p-6">
            <div className="flex justify-between items-center">
              <div className="w-8 h-8 rounded-full bg-white/20"></div>
              <div className="w-16 h-2 bg-white/20 rounded-full"></div>
            </div>
            <div className="space-y-3">
              <div className="w-full h-3 bg-white/20 rounded-full"></div>
              <div className="w-2/3 h-3 bg-white/10 rounded-full"></div>
            </div>
         </div>
      </div>
    );
  }

  if (type === 'brutal') {
    return (
      <div className="w-full h-full relative bg-[#DFDCD5] p-8 flex flex-col justify-between border-[6px] border-[#0a0a0a]">
        <div className="flex justify-between items-start border-b-[6px] border-[#0a0a0a] pb-4">
          <span className="font-mono text-xl font-black text-[#0a0a0a]">SYS.01</span>
          <div className="w-10 h-10 bg-aer-blue border-[4px] border-[#0a0a0a]"></div>
        </div>
        <h2 className="font-mono text-6xl md:text-8xl text-[#0a0a0a] uppercase font-black tracking-tighter leading-[0.85]">
          RAW<br/>DATA
        </h2>
      </div>
    );
  }

  if (type === 'kinetic') {
    return (
      <div className="w-full h-full relative bg-aer-blue flex flex-col items-center justify-center overflow-hidden">
        <div className="flex flex-col gap-2 transform -rotate-12 scale-125">
          <h2 className="font-editorial text-7xl md:text-8xl text-aer-charcoal uppercase leading-none whitespace-nowrap">
            MOTION MOTION MOTION
          </h2>
          <h2 className="font-editorial text-7xl md:text-8xl text-aer-charcoal uppercase leading-none whitespace-nowrap" style={{ WebkitTextStroke: '1.5px #0a0a0a', color: 'transparent' }}>
            MOTION MOTION MOTION
          </h2>
          <h2 className="font-editorial text-7xl md:text-8xl text-aer-charcoal uppercase leading-none whitespace-nowrap">
            MOTION MOTION MOTION
          </h2>
        </div>
      </div>
    );
  }

  if (type === 'editorial') {
    return (
      <div className="w-full h-full relative bg-aer-charcoal p-8 flex flex-col justify-between border border-aer-cream/10">
         <div className="flex justify-between items-start">
           <span className="font-editorial italic text-aer-cream/60 text-xl">Vol. IV</span>
           <span className="font-sans text-[8px] tracking-[0.2em] text-aer-cream/40 uppercase w-24 text-right">Curated Digital Experience</span>
         </div>
         <div className="border-t border-aer-cream/20 pt-6">
           <h2 className="font-editorial text-5xl md:text-6xl text-aer-cream uppercase leading-tight">
             The Art of<br/>Restraint
           </h2>
         </div>
      </div>
    );
  }

  if (type === 'glitch') {
    return (
      <div className="w-full h-full relative bg-[#050505] flex items-center justify-center overflow-hidden">
         <div className="relative font-mono text-5xl md:text-7xl font-bold uppercase tracking-widest">
           <span className="absolute top-0 left-0 -ml-[3px] mt-[3px] text-red-500 mix-blend-screen">ERROR</span>
           <span className="absolute top-0 left-0 ml-[3px] -mt-[3px] text-aer-blue mix-blend-screen">ERROR</span>
           <span className="relative text-aer-cream mix-blend-overlay">ERROR</span>
         </div>
         <div className="absolute top-1/3 left-0 w-full h-[2px] bg-aer-cream/20"></div>
         <div className="absolute bottom-1/3 left-0 w-full h-[1px] bg-aer-blue/30"></div>
      </div>
    );
  }

  if (type === 'spatial') {
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#0a0a0a] flex items-center justify-center perspective-[1000px]">
        <div className="w-48 h-48 border border-aer-cream/20 absolute transform rotate-x-45 rotate-z-45 translate-z-[-50px] transition-transform duration-700" />
        <div className="w-48 h-48 border border-aer-blue/40 absolute transform rotate-x-45 rotate-z-45 translate-z-[0px] transition-transform duration-700 backdrop-blur-sm bg-aer-blue/5" />
        <div className="w-48 h-48 border border-aer-cream/60 absolute transform rotate-x-45 rotate-z-45 translate-z-[50px] transition-transform duration-700 backdrop-blur-md bg-aer-cream/5 flex items-center justify-center">
          <span className="font-mono text-xs text-aer-cream -rotate-45 tracking-widest">Z-AXIS</span>
        </div>
      </div>
    );
  }

  if (type === 'minimal') {
    return (
      <div className="w-full h-full relative bg-[#E8E5DF] flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-[#111] absolute top-12 left-12"></div>
        <div className="w-[40%] h-[1px] bg-[#111]"></div>
        <span className="absolute bottom-12 right-12 font-sans text-[9px] tracking-[0.3em] text-[#111]">VOID</span>
      </div>
    );
  }

  return null;
}

function StyleCard({ s, index }: { s: any, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  
  // 3D Tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150, mass: 1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative w-full flex flex-col justify-center py-8 md:py-12 group">
      <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} text-[9px] tracking-[0.3em] text-aer-cream/30 hidden lg:block`}>
        {s.coord} // IDX: {s.id}
      </div>

      <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}>
        
        <motion.div 
          style={{ y: parallaxY, rotateX, rotateY, transformPerspective: 1000 }} 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full md:w-2/3 relative aspect-[4/5] md:aspect-[16/10] overflow-hidden bg-aer-black border border-aer-cream/5 group-hover:border-aer-blue/30 transition-colors duration-500"
        >
          <motion.div 
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-aer-charcoal z-20 origin-top"
          />
          <StyleDemo type={s.type} />
        </motion.div>

        <div className={`w-full md:w-1/3 flex flex-col justify-end h-full ${isEven ? 'items-start text-left' : 'items-start md:items-end text-left md:text-right'}`}>
           <div className="flex flex-col gap-4 w-full">
              <p className={`text-aer-blue text-xs tracking-[0.2em] overflow-hidden ${isEven ? '' : 'md:self-end'}`}>
                <motion.span 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                  className="block"
                >
                  {s.id}
                </motion.span>
              </p>
              
              <div className="overflow-hidden">
                <motion.h3 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                  className="font-editorial text-4xl md:text-5xl lg:text-6xl uppercase group-hover:text-aer-blue transition-colors duration-500"
                >
                  {s.title}
                </motion.h3>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className={`flex flex-col gap-3 mt-4 ${isEven ? '' : 'md:items-end'}`}
              >
                <p className="text-[10px] tracking-[0.2em] text-aer-cream/80 uppercase">{s.desc}</p>
                <p className="text-[10px] tracking-[0.15em] text-aer-cream/40 leading-relaxed max-w-xs">{s.story}</p>
              </motion.div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative w-full bg-aer-charcoal px-6 md:px-12 py-24 md:py-32 flex flex-col gap-8 md:gap-12">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-end mb-4 md:mb-8">
        <p className="text-aer-blue text-xs tracking-[0.2em]">DESIGN LANGUAGES</p>
        <p className="hidden md:block text-[9px] tracking-[0.3em] text-aer-cream/30 uppercase">SYS_LOG: AESTHETIC_EXPLORATION</p>
      </div>
      
      <div className="flex flex-col gap-12 md:gap-16 w-full max-w-7xl mx-auto">
        {stylesList.map((s, i) => (
          <StyleCard key={s.id} s={s} index={i} />
        ))}
      </div>
    </section>
  );
}