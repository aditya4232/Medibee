
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Github, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-6 glass"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about MediBee? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Name</label>
                    <Input placeholder="Your full name" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input placeholder="your.email@example.com" type="email" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Subject</label>
                    <Input placeholder="What's this about?" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Message</label>
                    <Textarea 
                      placeholder="Tell us more about your inquiry..."
                      className="mt-1 min-h-32"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold text-foreground">Email Support</h3>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    For general inquiries and support
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    support@medibee.ai
                  </p>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Github className="w-5 h-5 text-purple-500" />
                    <h3 className="font-semibold text-foreground">Open Source</h3>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    MediBee is open source. Contribute to our project!
                  </p>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">
                    github.com/medibee/medibee
                  </p>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-5 h-5 text-red-500" />
                    <h3 className="font-semibold text-foreground">Emergency</h3>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    For medical emergencies, contact emergency services immediately
                  </p>
                  <p className="text-red-600 dark:text-red-400 font-medium">
                    Emergency: 108 (India) | 911 (US)
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
