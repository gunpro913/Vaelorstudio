import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const capabilities = [
  { id: '01', title: 'STRATEGY', desc: 'Brand positioning, digital architecture, and user journey mapping.' },
  { id: '02', title: 'DESIGN', desc: 'Art direction, UI/UX, and immersive interface design.' },
  { id: '03', title: 'MOTION', desc: 'Cinematic transitions, micro-interactions, and 3D integration.' },
  { id: '04', title: 'DEVELOPMENT', desc: 'Creative coding, WebGL, and high-performance frontend architecture.' }
];

export default function Capabilities() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={containerRef} className="py-32 md:py-48 px-6 md:px-12 bg-aer-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-start">
        
        <div className="w-full md:w-1/3 relative h-full">
          <div className="sticky top-32 flex flex-col gap-4">
            <p className="text-aer-blue text-xs tracking-[0.2em]">CAPABILITIES</p>
            <p className="text-[9px] tracking-[0.3em] text-aer-cream/30 uppercase">SYS_LOG: CORE_COMPETENCIES</p>
          </div>
        </div>

        <motion.div style={{ y }} className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {capabilities.map((cap, i) => (
            <motion.div 
              key={cap.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-col gap-4 group"
            >
              <div className="flex items-center gap-4 border-b border-aer-cream/10 pb-4">
                <span className="text-aer-blue text-[10px] tracking-[0.2em]">{cap.id}</span>
                <h4 className="font-editorial text-2xl md:text-3xl uppercase group-hover:italic group-hover:tracking-widest transition-all duration-500">{cap.title}</h4>
              </div>
              <p className="text-xs tracking-[0.2em] text-aer-cream/50 leading-relaxed group-hover:text-aer-cream/80 transition-colors duration-500">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}