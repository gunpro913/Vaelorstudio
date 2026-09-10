import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const IMG = "https://dvxrhkgloakisnvqoxgl.supabase.co/storage/v1/object/sign/images/inputs/1789014158906_6781qi690.jpg?token=eyJraWQiOiI0NWE1YWU1ZS0xNzg4LTRiMWYtYWM5OC1hMjgwNmQ2OTM4ZWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvaW5wdXRzLzE3ODkwMTQxNTg5MDZfNjc4MXFpNjkwLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODkwMTU4OTYsImV4cCI6MTgyMDU1MTg5Nn0.oyEqj9q_LATBksIXwlqotcpDH_tlI-_YgTNCC5ATB1Q";

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
      <div className="w-full h-full relative bg-[#0a0a0a] flex items-center justify-center p-4 md:p-8 overflow-hidden group">
         <img src={IMG} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000 ease-out" alt="Glass Base" />
         
         {/* Glass Card */}
         <div className="relative w-full max-w-[200px] md:max-w-[240px] aspect-[3/4] backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl md:rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex flex-col justify-between p-4 md:p-6 z-10 group-hover:bg-white/10 transition-colors duration-500 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
            <div className="flex justify-between items-center z-10">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/30 shadow-inner"></div>
              <div className="w-8 md:w-12 h-1 md:h-1.5 bg-white/30 rounded-full"></div>
            </div>
            <div className="space-y-2 md:space-y-3 z-10">
              <div className="w-full h-1.5 md:h-2 bg-white/30 rounded-full"></div>
              <div className="w-4/5 h-1.5 md:h-2 bg-white/20 rounded-full"></div>
              <div className="w-1/2 h-1.5 md:h-2 bg-white/20 rounded-full"></div>
            </div>
         </div>
      </div>
    );
  }

  if (type === 'brutal') {
    return (
      <div className="w-full h-full relative bg-[#e0e0e0] flex flex-col justify-between border-[6px] md:border-[8px] border-black overflow-hidden group">
        <img src={IMG} className="absolute inset-0 w-full h-full object-cover grayscale contrast-150 opacity-30 mix-blend-multiply group-hover:scale-105 transition-transform duration-1000 ease-out" alt="Brutal Base" />
        
        <div className="flex justify-between items-start border-b-[6px] md:border-b-[8px] border-black pb-3 md:pb-4 relative z-10 p-4 md:p-6">
          <span className="font-mono text-xl md:text-2xl font-black text-black tracking-tighter">SYS.01</span>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="w-8 h-8 md:w-12 md:h-12 bg-aer-blue border-[3px] md:border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></motion.div>
        </div>
        
        <h2 className="font-mono text-4xl md:text-[4rem] text-black uppercase font-black tracking-tighter leading-[0.85] relative z-10 group-hover:scale-110 transition-transform duration-500 origin-bottom-left mt-auto p-4 md:p-6">
          RAW<br/>DATA<br/>ONLY
        </h2>
      </div>
    );
  }

  if (type === 'kinetic') {
    return (
      <div className="w-full h-full relative bg-aer-black flex items-center justify-center overflow-hidden group">
        <img src={IMG} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000 ease-out" alt="Kinetic Base" />
        
        <div className="absolute inset-0 flex flex-col justify-center gap-2 transform -rotate-12 scale-150 z-10 mix-blend-difference">
          <motion.div animate={{ x: ["-50%", "0%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="flex whitespace-nowrap">
            <h2 className="font-editorial text-6xl md:text-8xl text-white uppercase leading-none pr-4">MOTION MOTION MOTION MOTION</h2>
          </motion.div>
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="flex whitespace-nowrap">
            <h2 className="font-editorial text-6xl md:text-8xl text-white uppercase leading-none pr-4" style={{ WebkitTextStroke: '2px #fff', color: 'transparent' }}>MOTION MOTION MOTION MOTION</h2>
          </motion.div>
          <motion.div animate={{ x: ["-50%", "0%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="flex whitespace-nowrap">
            <h2 className="font-editorial text-6xl md:text-8xl text-white uppercase leading-none pr-4">MOTION MOTION MOTION MOTION</h2>
          </motion.div>
        </div>
      </div>
    );
  }

  if (type === 'editorial') {
    return (
      <div className="w-full h-full relative bg-[#FAF8F5] p-6 md:p-8 flex flex-col border border-[#111]/10 group overflow-hidden">
         <div className="flex justify-between items-start w-full relative z-20">
           <span className="font-editorial italic text-[#111] text-lg md:text-xl">Issue No. 4</span>
           <span className="font-sans text-[8px] tracking-[0.2em] text-[#111] uppercase">Curated</span>
         </div>
         <div className="absolute inset-0 flex flex-col justify-center items-center">
            <div className="w-3/4 h-3/4 bg-[#111] overflow-hidden relative">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={IMG} 
                className="w-full h-full object-cover opacity-90"
                alt="Editorial"
              />
            </div>
         </div>
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
           <h2 className="font-editorial text-5xl md:text-7xl text-white uppercase leading-none mix-blend-difference group-hover:tracking-widest transition-all duration-700">Restraint</h2>
         </div>
      </div>
    );
  }

  if (type === 'glitch') {
    return (
      <div className="w-full h-full relative bg-[#050505] flex items-center justify-center overflow-hidden group cursor-none">
         <img src={IMG} className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale" alt="Glitch Base" />
         
         <motion.div 
           animate={{ x: [-2, 2, -1, 3, 0], y: [1, -2, 2, -1, 0] }}
           transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
           className="relative font-mono text-3xl md:text-5xl font-bold uppercase tracking-widest z-10"
         >
           <span className="absolute top-0 left-0 -ml-[4px] mt-[2px] text-red-500 mix-blend-screen opacity-80">ERROR</span>
           <span className="absolute top-0 left-0 ml-[4px] -mt-[2px] text-cyan-400 mix-blend-screen opacity-80">ERROR</span>
           <span className="relative text-white mix-blend-overlay">ERROR</span>
         </motion.div>
         {/* Glitch slices */}
         <div className="absolute top-[20%] left-0 w-full h-[5px] bg-white/20 mix-blend-overlay group-hover:translate-x-10 transition-transform duration-75"></div>
         <div className="absolute top-[60%] left-0 w-full h-[2px] bg-aer-blue mix-blend-overlay group-hover:-translate-x-10 transition-transform duration-75"></div>
      </div>
    );
  }

  if (type === 'spatial') {
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#0a0a0a] flex items-center justify-center perspective-[1000px] group">
        <img src={IMG} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000 ease-out" alt="Spatial Base" />
        
        <motion.div 
          className="relative w-32 h-32 md:w-48 md:h-48 preserve-3d z-10"
          animate={{ rotateX: [20, 30, 20], rotateY: [-20, -10, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 border border-aer-cream/10 transform translate-z-[-30px] md:translate-z-[-40px] bg-aer-black/50 backdrop-blur-sm group-hover:translate-z-[-60px] md:group-hover:translate-z-[-80px] transition-transform duration-700" />
          <div className="absolute inset-0 border border-aer-blue/30 transform translate-z-[0px] bg-aer-blue/5 backdrop-blur-md group-hover:translate-z-[0px] transition-transform duration-700 shadow-[0_0_30px_rgba(64,224,208,0.1)]" />
          <div className="absolute inset-0 border border-aer-cream/50 transform translate-z-[30px] md:translate-z-[40px] bg-aer-cream/5 backdrop-blur-lg flex items-center justify-center group-hover:translate-z-[60px] md:group-hover:translate-z-[80px] transition-transform duration-700">
            <span className="font-mono text-[8px] md:text-[10px] text-aer-cream tracking-widest">Z-INDEX</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === 'minimal') {
    return (
      <div className="w-full h-full relative bg-[#F5F2EB] flex items-center justify-center group overflow-hidden">
        <img src={IMG} className="absolute w-1/3 h-1/3 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out z-0 grayscale mix-blend-multiply" alt="Minimal Base" />
        
        <motion.div 
          className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          whileHover={{ scale: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="w-[1px] h-full bg-[#0a0a0a]/10 absolute left-8 md:left-12 z-20"></div>
        <div className="w-full h-[1px] bg-[#0a0a0a]/10 absolute bottom-8 md:bottom-12 z-20"></div>
        <span className="absolute bottom-4 md:bottom-6 right-4 md:right-6 font-sans text-[8px] tracking-[0.4em] text-[#0a0a0a] mix-blend-difference z-20">VOID</span>
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
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]), springConfig);

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
    <div ref={ref} className="relative w-full flex flex-col justify-center py-6 md:py-10 group">
      <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} text-[9px] tracking-[0.3em] text-aer-cream/30 hidden lg:block`}>
        {s.coord} // IDX: {s.id}
      </div>

      <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-12 items-center`}>
        
        <motion.div 
          style={{ y: parallaxY, rotateX, rotateY, transformPerspective: 1200 }} 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full md:w-1/2 relative aspect-[4/5] md:aspect-square overflow-hidden bg-aer-black border border-aer-cream/5 group-hover:border-aer-blue/30 transition-colors duration-500 shadow-2xl"
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

        <div className={`w-full md:w-1/2 flex flex-col justify-end h-full ${isEven ? 'items-start text-left pl-0 md:pl-12' : 'items-start md:items-end text-left md:text-right pr-0 md:pr-12'}`}>
           <div className="flex flex-col gap-3 w-full">
              <p className={`text-aer-blue text-[10px] tracking-[0.2em] overflow-hidden ${isEven ? '' : 'md:self-end'}`}>
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
                  className="font-editorial text-4xl md:text-5xl uppercase group-hover:text-aer-blue transition-colors duration-500"
                >
                  {s.title}
                </motion.h3>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className={`flex flex-col gap-2 mt-2 ${isEven ? '' : 'md:items-end'}`}
              >
                <p className="text-[10px] tracking-[0.2em] text-aer-cream/80 uppercase">{s.desc}</p>
                <p className="text-[10px] tracking-[0.15em] text-aer-cream/40 leading-relaxed max-w-sm mt-2">{s.story}</p>
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
      <div className="w-full max-w-6xl mx-auto flex justify-between items-end mb-4 md:mb-8">
        <p className="text-aer-blue text-xs tracking-[0.2em]">DESIGN LANGUAGES</p>
        <p className="hidden md:block text-[9px] tracking-[0.3em] text-aer-cream/30 uppercase">SYS_LOG: AESTHETIC_EXPLORATION</p>
      </div>
      
      <div className="flex flex-col gap-16 md:gap-24 w-full max-w-6xl mx-auto">
        {stylesList.map((s, i) => (
          <StyleCard key={s.id} s={s} index={i} />
        ))}
      </div>
    </section>
  );
}