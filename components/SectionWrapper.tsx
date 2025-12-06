import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  id: string;
  className?: string;
}

const SectionWrapper: React.FC<Props> = ({ children, id, className = "" }) => {
  return (
    <section id={id} className={`py-20 md:py-32 relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;