import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star, Sparkles, Leaf } from "lucide-react";

export default function AISeedInsightsCard() {
  return (
    <section className="p-6 mt-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto"
      >
        <motion.div
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.25)"
          }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden"
        >
          <Card className="rounded-3xl border-0 bg-gradient-to-br from-emerald-50 via-white to-yellow-50 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500">
            {/* Subtle animated background glow */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-green-300 to-transparent rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-yellow-300 to-transparent rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            <CardContent className="relative z-10 flex gap-5 items-start p-7">
              {/* Icon with floating animation */}
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative bg-gradient-to-br from-yellow-100 to-green-100 p-4 rounded-2xl shadow-lg ring-2 ring-white/50"
              >
                <Sparkles className="w-7 h-7 text-green-600" />
                <Leaf className="absolute -top-1 -right-1 w-4 h-4 text-green-500" />
              </motion.div>

              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-800 tracking-tight">
                  AI Seed Insights
                </h3>
                <p className="text-base text-gray-600 mt-2 leading-relaxed">
                  Unlock <span className="font-semibold text-green-700">data-driven wisdom</span> for your fields. 
                  Optimize yields with AI-powered seed selection, soil matching, and climate forecasting.
                </p>

                {/* Coming Soon Badge with shimmer */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 inline-flex items-center gap-2"
                >
                  <span className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold shadow-md">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-3 h-3"
                    >
                      <Star className="w-full h-full fill-yellow-300 text-yellow-300" />
                    </motion.div>
                    Coming Soon
                    <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                  </span>
                </motion.div>
              </div>
            </CardContent>

            {/* Bottom accent line */}
            <div className="h-1 bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 rounded-b-3xl" />
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}