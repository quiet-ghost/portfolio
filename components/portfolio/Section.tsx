import { ReactNode } from "react";
import { useTheme } from "@/components/ThemeProvider";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  variant?: "default" | "card";
};

export function Section({ id, className = "", children, variant = "default" }: SectionProps) {
  const { isDark } = useTheme();
  
  if (variant === "card") {
    return (
      <section id={id} className="py-20 px-6">
        <div className={`max-w-6xl mx-auto backdrop-blur-xl rounded-3xl p-8 md:p-12 border shadow-2xl transition-all duration-300 ${
          isDark 
            ? 'bg-zinc-900/70 border-cyan-400/20 shadow-cyan-400/10' 
            : 'bg-white/80 border-gray-200/50 shadow-gray-900/10'
        } ${className}`}>
          {children}
        </div>
      </section>
    );
  }
  
  return (
    <section id={id} className={`py-20 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}