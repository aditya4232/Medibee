
import { motion } from 'framer-motion';
import { TrendingDown, Users, MapPin, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const MedicalHurdlesIndia = () => {
  const accessibilityData = [
    { category: 'Urban', percentage: 75 },
    { category: 'Rural', percentage: 35 },
    { category: 'Remote', percentage: 15 }
  ];

  const affordabilityData = [
    { name: 'Cannot Afford', value: 60, color: '#ef4444' },
    { name: 'Partially Afford', value: 25, color: '#f59e0b' },
    { name: 'Can Afford', value: 15, color: '#10b981' }
  ];

  return (
    <section className="relative z-10 py-20 px-4 bg-gradient-to-r from-red-50/50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Healthcare Challenges in India
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the problems we're solving to make healthcare accessible for everyone
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Healthcare Accessibility Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-6 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="text-medical-blue" />
              Healthcare Accessibility
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={accessibilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Only 35% of rural population has access to quality healthcare in India
            </p>
          </motion.div>

          {/* Affordability Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-6 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <DollarSign className="text-medical-green" />
              Healthcare Affordability
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={affordabilityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {affordabilityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-sm text-muted-foreground mt-4">
              60% of Indians cannot afford proper healthcare treatment
            </p>
          </motion.div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Users, stat: "1.4B", label: "Population", desc: "People needing healthcare" },
            { icon: TrendingDown, stat: "1:1456", label: "Doctor Ratio", desc: "Doctors per population" },
            { icon: MapPin, stat: "70%", label: "Rural Population", desc: "Limited healthcare access" },
            { icon: DollarSign, stat: "₹3000", label: "Average Income", desc: "Monthly household income" }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-2xl text-center"
            >
              <div className="w-12 h-12 bg-medical-red/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="text-medical-red" size={24} />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{item.stat}</div>
              <div className="text-lg font-semibold text-foreground mb-1">{item.label}</div>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* How MediBee Solves This */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass p-8 rounded-2xl"
        >
          <h3 className="text-3xl font-bold text-foreground mb-6 text-center">
            How MediBee Solves These Challenges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Accessibility</h4>
              <p className="text-muted-foreground">Free AI-powered medical assistance accessible via any smartphone</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Affordability</h4>
              <p className="text-muted-foreground">Zero cost basic healthcare guidance and medicine information</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌐</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Reach</h4>
              <p className="text-muted-foreground">Available in local languages with offline capabilities</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MedicalHurdlesIndia;
