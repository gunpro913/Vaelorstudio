import { motion } from 'framer-motion';

export default function Philosophy() {
  return (
    <section id="studio" className="py-24 md:py-32 px-6 md:px-12 bg-aer-charcoal relative overflow-hidden flex items-center justify-center min-h-[40vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6 md:gap-8"
      >
        <p className="text-aer-blue text-[10px] tracking-[0.3em]">PHILOSOPHY</p>
        <h3 className="font-editorial text-3xl md:text-5xl lg:text-6xl leading-tight text-aer-cream uppercase">
          <span className="italic text-aer-blue">Friction</span> by design.
        </h3>
      </motion.div>
    </section>
  );
}