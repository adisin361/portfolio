import { motion } from "framer-motion";
import { RESUME } from "@/data/resume";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-background/50">
      <div className="container max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <div className="relative space-y-12">
          {/* Timeline line */}
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-white/10 md:left-1/2 md:-translate-x-1/2" />

          {RESUME.experience.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 w-3 h-3 bg-primary rounded-full border-4 border-background z-10 mt-6" />

              <div className="ml-12 md:ml-0 md:w-1/2 p-6 glass-card rounded-xl hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground">{job.role}</h3>
                </div>
                <h4 className="text-lg text-primary font-medium mb-4">{job.company}</h4>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6 font-mono">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {job.period}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    {job.location}
                  </div>
                </div>

                <ul className="space-y-3">
                  {job.highlights.map((highlight, i) => (
                    <li key={i} className="text-muted-foreground text-sm leading-relaxed flex gap-3">
                      <span className="text-primary mt-1.5">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
