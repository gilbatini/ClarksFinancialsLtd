import { motion } from "motion/react";

const stats = [
  { label: "Serving Since 2012", value: "13+ YRS", color: "text-secondary" },
  { label: "Maximum Loan", value: "15M+", color: "text-white" },
  { label: "Approval Time", value: "24 HRS", color: "text-white" },
  { label: "Hidden Fees", value: "0.0%", color: "text-secondary" },
];

export default function Stats() {
  return (
    <section className="bg-primary py-8 overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="flex flex-wrap justify-between items-center gap-8 text-white">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col"
              >
                <span className={`font-headline text-5xl font-black ${stat.color}`}>{stat.value}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">{stat.label}</span>
              </motion.div>
              {index < stats.length - 1 && (
                <div className="hidden md:block w-px h-12 bg-white/20"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
