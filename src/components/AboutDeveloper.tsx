
import { motion } from 'framer-motion';
import { User, GraduationCap, Cloud, Code, Github, Linkedin } from 'lucide-react';

const AboutDeveloper = () => {
  return (
    <section className="relative z-10 py-20 px-4 bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            About the Developer
          </h2>
          <p className="text-xl text-muted-foreground">
            Meet the mind behind MediBee
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-3xl"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-medical-gradient rounded-full flex items-center justify-center text-6xl font-bold text-white">
              AS
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl font-bold text-foreground mb-2">Aditya Shenvi</h3>
              <p className="text-xl text-medical-blue font-semibold mb-4">Final Year Engineering Student | 2025</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <GraduationCap className="text-medical-purple" size={20} />
                  <span className="text-foreground">Engineering Student</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Cloud className="text-medical-blue" size={20} />
                  <span className="text-foreground">Cloud Technology Enthusiast</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Code className="text-medical-green" size={20} />
                  <span className="text-foreground">Full-Stack Developer</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <User className="text-medical-amber" size={20} />
                  <span className="text-foreground">Cloud Dev Aspirant</span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Passionate about leveraging technology to solve real-world problems in healthcare. 
                Currently pursuing engineering with a focus on cloud technologies and development. 
                MediBee represents my vision of democratizing healthcare through innovative AI solutions.
              </p>

              <div className="flex gap-4 justify-center lg:justify-start">
                <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:shadow-glass transition-all">
                  <Github size={18} />
                  <span>GitHub</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:shadow-glass transition-all">
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white/5 rounded-2xl">
            <h4 className="text-lg font-semibold text-foreground mb-4">Vision Statement</h4>
            <p className="text-muted-foreground italic">
              "I believe technology should serve humanity, especially in critical areas like healthcare. 
              MediBee is my contribution to making quality medical guidance accessible to every Indian, 
              regardless of their background or location. Through AI and cloud technologies, 
              we can bridge the healthcare gap and empower people to make informed health decisions."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutDeveloper;
