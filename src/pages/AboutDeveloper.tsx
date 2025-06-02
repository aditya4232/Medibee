
import { motion } from 'framer-motion';
import { User, GraduationCap, Cloud, Code, Github, Linkedin, Download, Mail, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import Footer from '@/components/Footer';

const AboutDeveloper = () => {
  const handleDownloadResume = () => {
    // This would trigger a resume download
    console.log('Download resume clicked');
  };

  const handleContact = (type: 'email' | 'linkedin' | 'github') => {
    const links = {
      email: 'mailto:adityashenvi@example.com',
      linkedin: 'https://linkedin.com/in/aditya-shenvi',
      github: 'https://github.com/aditya-shenvi'
    };
    window.open(links[type], '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800">
      <MedicalDisclaimer />
      <ThemeSwitcher />
      <Navigation />
      <ScrollProgressBar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-medical-gradient rounded-full flex items-center justify-center text-4xl sm:text-6xl font-bold text-white mx-auto mb-6 shadow-xl">
              AS
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">Aditya Shenvi</h1>
            <p className="text-lg sm:text-xl text-medical-blue font-semibold mb-6">Final Year Engineering Student | 2025</p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
                <MapPin size={16} />
                <span>India</span>
              </div>
              <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
                <Calendar size={16} />
                <span>Available for Opportunities</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={handleDownloadResume}
                className="bg-medical-gradient hover:shadow-lg text-white px-6 py-3 rounded-xl font-semibold"
              >
                <Download size={18} className="mr-2" />
                Download Resume
              </Button>
              <Button
                onClick={() => handleContact('email')}
                variant="outline"
                className="px-6 py-3 rounded-xl font-semibold"
              >
                <Mail size={18} className="mr-2" />
                Contact Me
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Passionate about leveraging technology to solve real-world problems in healthcare. 
              Currently pursuing engineering with a focus on cloud technologies and development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="glass h-full">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Skills & Expertise</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: GraduationCap, text: 'Engineering Student', color: 'text-medical-purple' },
                      { icon: Cloud, text: 'Cloud Technologies', color: 'text-medical-blue' },
                      { icon: Code, text: 'Full-Stack Development', color: 'text-medical-green' },
                      { icon: User, text: 'AI & Machine Learning', color: 'text-medical-amber' }
                    ].map((skill, index) => (
                      <motion.div
                        key={skill.text}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <skill.icon className={`${skill.color} flex-shrink-0`} size={20} />
                        <span className="text-foreground text-sm sm:text-base">{skill.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="glass h-full">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Vision Statement</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base italic">
                    "I believe technology should serve humanity, especially in critical areas like healthcare. 
                    MediBee is my contribution to making quality medical guidance accessible to every Indian, 
                    regardless of their background or location. Through AI and cloud technologies, 
                    we can bridge the healthcare gap and empower people to make informed health decisions."
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Project Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="glass">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Featured Project: MediBee</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 text-sm sm:text-base">
                  MediBee represents my vision of democratizing healthcare through innovative AI solutions. 
                  This platform combines cutting-edge technology with practical healthcare needs, 
                  providing accessible medical guidance to users across India.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {[
                    'React & TypeScript',
                    'Firebase Integration',
                    'AI-Powered Analysis',
                    'PWA Ready',
                    'Mobile Responsive',
                    'Cloud Deployment'
                  ].map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-medical-gradient/10 px-3 py-2 rounded-lg text-sm font-medium text-foreground"
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    onClick={() => handleContact('github')}
                    variant="outline"
                    className="px-4 py-2 rounded-lg"
                  >
                    <Github size={16} className="mr-2" />
                    View Code
                  </Button>
                  <Button
                    onClick={() => handleContact('linkedin')}
                    variant="outline"
                    className="px-4 py-2 rounded-lg"
                  >
                    <Linkedin size={16} className="mr-2" />
                    Connect on LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutDeveloper;
