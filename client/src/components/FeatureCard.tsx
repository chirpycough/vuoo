import { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  delay?: number;
}

export function FeatureCard({ icon, title, description, href = "/connect", delay = 0 }: FeatureCardProps) {
  return (
    <Link href={href} className="block group h-full">
      <div 
        className="glass-card h-full rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30"
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowRight className="w-5 h-5 text-cyan-400" />
        </div>
        
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
            {icon}
          </div>
        </div>
        
        <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}
