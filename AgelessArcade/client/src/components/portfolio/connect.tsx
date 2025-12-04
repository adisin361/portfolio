import { motion } from "framer-motion";
import { Instagram, ArrowRight } from "lucide-react";

export function Connect() {
  return (
    <section id="connect" className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-background z-0" />
      
      <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-3xl border border-white/10 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-32 bg-pink-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-pink-500/30 transition-all duration-700" />
          <div className="absolute bottom-0 left-0 p-32 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:bg-purple-500/30 transition-all duration-700" />

          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect Beyond Code</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
            Follow my journey, photography, and daily updates on Instagram. 
            Feel free to slide into DMs for collaborations!
          </p>

          <motion.a
            href="https://instagram.com/adisin361"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-pink-500/25 transition-all relative z-10"
          >
            <Instagram size={24} />
            <span>@adisin361</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
