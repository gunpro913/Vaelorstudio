import { useRef } from 'react';
import { motion, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const letterSpacing = useTransform(smoothVelocity, [-1000, 1000], ['-0.05em', '0.05em']);

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="inline-block transition-transform duration-500 hover:-translate-y-2 hover:text-aer-blue cursor-default">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 w-full px-6 md:px-12 text-center flex flex-col items-center"
      >
        <motion.div style={{ letterSpacing }} className="font-editorial text-[12vw] md:text-[8vw] leading-[0.9] uppercase max-w-[90vw] mx-auto flex flex-col items-center">
          <motion.div style={{ y: y1 }} className="flex gap-4">
            <div>{splitText('Make')}</div>
            <div>{splitText('Your')}</div>
          </motion.div>
          <motion.div style={{ y: y2 }} className="italic text-aer-cream/90 transition-all duration-700 hover:scale-105 hover:tracking-widest">
            {splitText('Website')}
          </motion.div>
          <motion.div style={{ y: y3 }} className="flex gap-4">
            <div>{splitText('Hit The')}</div>
          </motion.div>
          <motion.div style={{ y: y1 }} className="flex gap-4">
            <div>{splitText('Spotlight')}</div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div style={{ opacity: indicatorOpacity }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[9px] tracking-[0.4em] text-aer-cream/40 uppercase">Scroll to explore</span>
        <motion.div
          animate={{ height: ['0px', '40px', '0px'], opacity: [0, 1, 0], y: [0, 20, 40] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] bg-aer-cream/40"
        />
      </motion.div>
    </section>
  );
}
