import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  { name: "WEBSITE DESIGN", desc: "Crafting bespoke digital environments that reflect brand essence and captivate audiences." },
  { name: "INTERACTIVE EXPERIENCES", desc: "Building immersive, scroll-driven narratives that turn passive viewers into active participants." },
  { name: "3D & MOTION", desc: "Integrating fluid cinematic motion and spatial design to elevate the digital atmosphere." },
  { name: "WEBSITE REDESIGN", desc: "Transforming outdated platforms into modern, high-performance editorial experiences." },
  { name: "CREATIVE DEVELOPMENT", desc: "Pushing the boundaries of web technology with experimental, award-winning code." }
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 bg-aer-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex justify-between items-end">
          <p className="text-aer-blue text-xs tracking-[0.2em]">SERVICES</p>
          <p className="hidden md:block text-[9px] tracking-[0.3em] text-aer-cream/30">SYS_CAPABILITY_MATRIX</p>
        </div>
        
        <div className="flex flex-col gap-4 md:gap-6">
          {services.map((service, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer border-b border-aer-cream/10 pb-4 md:pb-6 relative flex flex-col items-start overflow-hidden"
              >
                {/* Smooth background highlight */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-aer-cream origin-bottom -z-10"
                />

                {/* Text-as-interface */}
                <motion.h3 
                  animate={{ 
                    color: isHovered ? 'var(--color-aer-charcoal)' : 'rgba(250, 248, 245, 0.6)',
                    x: isHovered ? 24 : 0,
                    fontStyle: isHovered ? 'italic' : 'normal'
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-editorial text-2xl md:text-4xl lg:text-5xl uppercase inline-block py-2 z-10"
                >
                  {service.name}
                </motion.h3>
                
                {/* Expandable Description */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden max-w-2xl z-10"
                    >
                      <p className="text-[10px] tracking-[0.2em] text-aer-charcoal/70 uppercase pt-2 pb-4 pl-6 font-medium">
                        {service.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Hover Underline */}
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: isHovered ? "0%" : "-100%" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-aer-blue z-20" 
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}