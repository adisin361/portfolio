import { motion } from "framer-motion";
import { RESUME } from "@/data/resume";
import heroBg from "@assets/generated_images/abstract_dark_technological_background_with_glowing_lines.png";
import profileImage from "@assets/IMG_2422_1764833576025.jpeg";
import { ArrowDown, Download } from "lucide-react";

export function Hero() {
  return (
    <section 
      id="about"
      className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      <div className="container max-w-6xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono">
            Available for new opportunities
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Building <span className="text-gradient">Digital</span> <br />
            Experiences.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
            I'm <strong className="text-foreground">{RESUME.profile.name}</strong>, a {RESUME.profile.role} based in Bengaluru. 
            I specialize in high-performance frontend architectures and scalable full-stack systems.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href="/resume.pdf"
              download="Aditya_Sinha_Resume.pdf"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Download size={20} />
              Download Resume
            </a>
            <a
              href="mailto:adityasinha361@gmail.com"
              className="px-6 py-3 bg-secondary/50 text-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-colors border border-white/5 flex items-center gap-2"
            >
              Contact Me
            </a>
          </div>

          <div className="flex flex-wrap gap-4">
            {RESUME.profile.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all border border-white/5"
                title={link.label}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative block mt-12 mb-12 md:mt-0 md:mb-0"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="w-full h-full rounded-full border-4 border-white/10 shadow-2xl relative z-10 overflow-hidden bg-secondary">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            {/* Floating tech badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-4 -right-4 bg-card border border-white/10 p-3 rounded-xl shadow-lg z-20"
            >
              <span className="font-bold text-blue-400">React</span>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 1 }}
              className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 bg-card border border-white/10 p-3 rounded-xl shadow-lg z-20"
            >
              <span className="font-bold text-red-400">Angular</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#experience"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  );
}
