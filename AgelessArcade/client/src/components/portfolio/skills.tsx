import { motion } from "framer-motion";
import { RESUME } from "@/data/resume";

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-secondary/10">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Arsenal</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A collection of tools and technologies I use to build high-quality software.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <SkillCard title="Languages" skills={RESUME.skills.languages} delay={0} />
          <SkillCard title="Frameworks" skills={RESUME.skills.frameworks} delay={0.2} />
          <SkillCard title="Tools & Platforms" skills={RESUME.skills.tools} delay={0.4} />
        </div>
      </div>
    </section>
  );
}

function SkillCard({ title, skills, delay }: { title: string, skills: string[], delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-card p-6 rounded-xl"
    >
      <h3 className="text-xl font-bold mb-6 text-primary border-b border-white/10 pb-4">
        {title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 bg-background rounded-lg text-sm font-medium border border-white/5 hover:border-primary/50 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
