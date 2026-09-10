import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  { id: '01', title: 'GET TO KNOW YOU', desc: 'Understanding your brand, vision, and the core objectives of the digital experience.' },
  { id: '02', title: 'QUESTIONNAIRE', desc: 'Gathering deep insights to inform our strategic approach and creative direction.' },
  { id: '03', title: 'SITE MAP', desc: 'Architecting the structural foundation and user journey of the platform.' },
  { id: '04', title: 'WIREFRAME', desc: 'Drafting the skeletal framework to establish layout, hierarchy, and flow.' },
  { id: '05', title: 'PROTOTYPE', desc: 'Breathing life into the design with interactive motion and high-fidelity visuals.' },
  { id: '06', title: 'ITERATION', desc: 'Refining and polishing through continuous iteration till completion.' }
];

function Step({ step, index }: { step: any, index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative flex flex-col md:flex-row items-start md:items-center w-full group ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-aer-black border border-aer-cream/30 group-hover:border-aer-blue group-hover:bg-aer-blue transition-all duration-500 -translate-x-[7px] md:-translate-x-1/2 mt-1.5 md:mt-0 z-10"></div>

      <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
        <p className="text-aer-blue text-[10px] tracking-[0.2em] mb-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500">{step.id}</p>
        <h3 className="font-editorial text-3xl md:text-5xl uppercase mb-4 group-hover:italic transition-all duration-500">{step.title}</h3>
        <p className="text-xs tracking-[0.2em] text-aer-cream/40 leading-relaxed group-hover:text-aer-cream/80 transition-colors duration-500">{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" ref={containerRef} className="py-32 md:py-48 bg-aer-black relative overflow-hidden">
      <div className="px-6 md:px-12 mb-32 text-center">
        <p className="text-aer-blue text-xs tracking-[0.2em] mb-6">PROCESS</p>
        <h2 className="font-editorial text-5xl md:text-7xl uppercase">The Journey</h2>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 z-10">
        {/* Central Storyline Background */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-aer-cream/10 md:-translate-x-1/2"></div>
        
        {/* Central Storyline Progress */}
        <motion.div 
          style={{ height: lineHeight }}
          className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-aer-blue md:-translate-x-1/2 origin-top"
        ></motion.div>

        <div className="flex flex-col gap-24 md:gap-40 py-12">
          {steps.map((step, i) => (
            <Step key={step.id} step={step} index={i} />
          ))}
          
          {/* End of Journey */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative flex flex-col md:flex-row items-center justify-center w-full mt-12 md:mt-24 group"
          >
            <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-aer-blue shadow-[0_0_15px_rgba(64,224,208,0.6)] -translate-x-[7px] md:-translate-x-1/2 mt-1.5 md:mt-0 z-10"></div>
            <h3 className="font-editorial text-4xl md:text-6xl lg:text-7xl uppercase italic text-aer-cream text-left md:text-center w-full pl-12 md:pl-0">
              Your Perfect Website.
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
}