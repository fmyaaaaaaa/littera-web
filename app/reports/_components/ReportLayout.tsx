import { motion } from "framer-motion";

interface ReportLayoutProps {
  children: React.ReactNode;
}

export function ReportLayout({ children }: ReportLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-7 gap-6"
    >
      {children}
    </motion.div>
  );
}
