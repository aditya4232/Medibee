import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Save, Calendar, MapPin, Phone, Mail, Heart, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSession } from './SessionProvider';
import { useToast } from '@/hooks/use-toast';

const UserProfile = () => {
  const { session, updateUserData } = useSession();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    fullName: session?.userData?.userName || '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    emergencyContact: '',
    bloodGroup: '',
    allergies: '',
    currentMedications: '',
    medicalHistory: '',
    height: '',
    weight: ''
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await updateUserData({
        userName: profile.fullName,
        profile: profile
      });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-medical-blue" />
            User Profile Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profile.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className="glass border-white/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={profile.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="Enter your age"
                  className="glass border-white/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={profile.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className="glass border-white/20">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="glass border-white/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="glass border-white/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select value={profile.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)}>
                  <SelectTrigger className="glass border-white/20">
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={profile.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your complete address"
                className="glass border-white/20"
                rows={3}
              />
            </div>
          </div>

          {/* Physical Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Physical Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={profile.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  placeholder="170"
                  className="glass border-white/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={profile.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  placeholder="70"
                  className="glass border-white/20"
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Medical Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={profile.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                placeholder="Emergency contact name and phone"
                className="glass border-white/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="allergies">Known Allergies</Label>
              <Textarea
                id="allergies"
                value={profile.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                placeholder="List any known allergies (food, medicine, environmental)"
                className="glass border-white/20"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currentMedications">Current Medications</Label>
              <Textarea
                id="currentMedications"
                value={profile.currentMedications}
                onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                placeholder="List current medications with dosage"
                className="glass border-white/20"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Textarea
                id="medicalHistory"
                value={profile.medicalHistory}
                onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                placeholder="Brief medical history, past surgeries, chronic conditions"
                className="glass border-white/20"
                rows={4}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="w-full bg-medical-gradient hover:opacity-90 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving Profile...' : 'Save Profile'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
