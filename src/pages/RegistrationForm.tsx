import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Send, Loader2, Bell } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { toast } from 'sonner';

enum OperationType {
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const RegistrationForm: React.FC = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const eventTitle = queryParams.get('event') || 'Event';

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '1st Year',
    department: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Create Registration Document
      try {
        await addDoc(collection(db, 'registrations'), {
          ...formData,
          event: eventTitle,
          timestamp: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, 'registrations');
      }

      // 2. Create Notice Board Notification
      const today = new Date().toISOString().split('T')[0];
      try {
        await addDoc(collection(db, 'notices'), {
          titleEn: `New Registration: ${formData.name}`,
          titleOl: `ᱱᱟᱣᱟ ᱨᱮᱡᱤᱥᱴᱨᱮᱥᱚᱱ: ${formData.name}`,
          contentEn: `${formData.name} from ${formData.college} has registered for ${eventTitle}.`,
          contentOl: `${formData.college} ᱠᱷᱚᱱ ${formData.name} ᱫᱚ ${eventTitle} ᱞᱟᱹᱜᱤᱫ ᱨᱮᱡᱤᱥᱴᱟᱨ ᱟᱠᱟᱱᱟᱭ ᱾`,
          date: today,
          isImportant: true,
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, 'notices');
      }

      toast.success('Registration submitted and notice posted!');
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting registration:", error);
      toast.error("Failed to submit registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-6">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex justify-center"
        >
          <CheckCircle2 size={80} className="text-green-500" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gov-blue uppercase tracking-wider">Registration Successful!</h2>
        <p className="text-gray-600 text-lg">
          Thank you for registering for <strong>{eventTitle}</strong>. We have received your details and a notification has been posted on the <strong>Notice Board</strong>.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/notices')}
            className="bg-gov-accent text-gov-blue px-8 py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-gov-blue hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <Bell size={20} /> View Notice Board
          </button>
          <button 
            onClick={() => navigate('/events')}
            className="bg-gov-blue text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-gov-accent hover:text-gov-blue transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} /> Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gov-light rounded-full transition-colors text-gov-blue">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-3xl font-bold text-gov-blue uppercase tracking-wider">Event Registration</h2>
      </div>

      <div className="bg-white border border-gov-border rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gov-blue text-white p-6">
          <p className="text-gov-accent font-bold uppercase tracking-widest text-sm mb-1">Registering for:</p>
          <h3 className="text-2xl font-bold uppercase">{eventTitle}</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gov-blue uppercase tracking-wider">{t('full_name')}</label>
              <input 
                required
                type="text" 
                className="w-full p-3 border border-gov-border rounded focus:ring-2 focus:ring-gov-blue outline-none transition-all"
                placeholder={t('placeholder_name')}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gov-blue uppercase tracking-wider">{t('email_address')}</label>
              <input 
                required
                type="email" 
                className="w-full p-3 border border-gov-border rounded focus:ring-2 focus:ring-gov-blue outline-none transition-all"
                placeholder={t('placeholder_email')}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gov-blue uppercase tracking-wider">Phone Number</label>
              <input 
                required
                type="tel" 
                className="w-full p-3 border border-gov-border rounded focus:ring-2 focus:ring-gov-blue outline-none transition-all"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gov-blue uppercase tracking-wider">College / University</label>
              <input 
                required
                type="text" 
                className="w-full p-3 border border-gov-border rounded focus:ring-2 focus:ring-gov-blue outline-none transition-all"
                placeholder="Enter your institution name"
                value={formData.college}
                onChange={(e) => setFormData({...formData, college: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gov-blue uppercase tracking-wider">Year of Study</label>
              <select 
                className="w-full p-3 border border-gov-border rounded focus:ring-2 focus:ring-gov-blue outline-none transition-all bg-white"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
              >
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
                <option>Pass Out</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gov-blue uppercase tracking-wider">Department</label>
              <input 
                required
                type="text" 
                className="w-full p-3 border border-gov-border rounded focus:ring-2 focus:ring-gov-blue outline-none transition-all"
                placeholder="e.g. CSE, ME, EE"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gov-blue text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-gov-accent hover:text-gov-blue transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send size={20} /> Submit Registration
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
