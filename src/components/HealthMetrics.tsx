
import { motion } from 'framer-motion';
import { Heart, Activity, Thermometer, Droplets, Brain, TrendingUp } from 'lucide-react';

const HealthMetrics = () => {
  const metrics = [
    {
      title: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "green",
      icon: Heart,
      trend: "+2%",
      description: "Normal range"
    },
    {
      title: "Heart Rate",
      value: "72",
      unit: "bpm",
      status: "green", 
      icon: Activity,
      trend: "-1%",
      description: "Resting rate"
    },
    {
      title: "Body Temperature",
      value: "98.6",
      unit: "°F",
      status: "green",
      icon: Thermometer,
      trend: "0%",
      description: "Normal"
    },
    {
      title: "Blood Sugar",
      value: "95",
      unit: "mg/dL",
      status: "yellow",
      icon: Droplets,
      trend: "+5%",
      description: "Pre-meal"
    },
    {
      title: "Stress Level",
      value: "Low",
      unit: "",
      status: "green",
      icon: Brain,
      trend: "-10%",
      description: "Well managed"
    },
    {
      title: "BMI",
      value: "22.4",
      unit: "",
      status: "green",
      icon: TrendingUp,
      trend: "+0.5%",
      description: "Healthy weight"
    }
  ];

  const statusColors = {
    green: {
      bg: "bg-medical-green/20 dark:bg-neon-lime/20",
      text: "text-medical-green dark:text-neon-lime",
      border: "border-medical-green/30 dark:border-neon-lime/30",
      glow: "shadow-neon-green"
    },
    yellow: {
      bg: "bg-medical-amber/20 dark:bg-yellow-400/20", 
      text: "text-medical-amber dark:text-yellow-400",
      border: "border-medical-amber/30 dark:border-yellow-400/30",
      glow: "shadow-yellow-400/50"
    },
    red: {
      bg: "bg-medical-red/20 dark:bg-red-400/20",
      text: "text-medical-red dark:text-red-400", 
      border: "border-medical-red/30 dark:border-red-400/30",
      glow: "shadow-red-400/50"
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => {
        const colors = statusColors[metric.status];
        const Icon = metric.icon;
        
        return (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`glass p-6 rounded-2xl border ${colors.border} hover:${colors.glow} transition-all duration-300 group`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon size={24} className={colors.text} />
              </div>
              <div className={`px-2 py-1 ${colors.bg} rounded-lg`}>
                <span className={`text-xs font-medium ${colors.text}`}>
                  {metric.trend}
                </span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {metric.title}
            </h3>
            
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-foreground">
                {metric.value}
              </span>
              {metric.unit && (
                <span className="text-sm text-muted-foreground">
                  {metric.unit}
                </span>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground">
              {metric.description}
            </p>
            
            {/* Progress indicator */}
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: metric.status === 'green' ? '80%' : metric.status === 'yellow' ? '60%' : '40%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (index * 0.1), duration: 1 }}
                className={`h-full ${colors.bg.replace('/20', '/60')} rounded-full`}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HealthMetrics;
