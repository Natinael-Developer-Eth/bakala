import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, User } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import logo from '@/assets/logo.png';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [phone, setPhone] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleSendOTP = () => {
    if (phone.length >= 9) {
      setShowOTP(true);
    }
  };

  const handleVerifyOTP = () => {
    // Mock login
    setUser({
      id: '1',
      name: 'Nhatty',
      phone: phone,
      address: 'Bole Road, Addis Ababa',
      location: {
        lat: 9.0054,
        lng: 38.7636,
        area: 'Bole, Addis Ababa',
      },
    });
    navigate('/home', { replace: true });
  };

  const handleGuestContinue = () => {
    navigate('/home', { replace: true });
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  return (
    <div className="mobile-container min-h-screen bg-background flex flex-col">
      {/* Header with logo */}
      <div className="pt-12 pb-8 px-6 text-center">
        <motion.div
          className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' }}
        >
          <img src={logo} alt="Bakala Everywhere" className="w-full h-full object-contain" />
        </motion.div>
        
        <motion.h1
          className="text-2xl font-bold text-foreground mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {showOTP ? 'Verify Your Number' : 'Welcome Back'}
        </motion.h1>
        
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {showOTP
            ? `Enter the code sent to +251 ${phone}`
            : 'Enter your phone number to continue'}
        </motion.p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6">
        {!showOTP ? (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Phone input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
                <Phone size={20} />
                <span className="text-foreground font-medium">+251</span>
              </div>
              <input
                type="tel"
                placeholder="9X XXX XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="input-field pl-28 text-lg"
                maxLength={9}
              />
            </div>

            {/* Continue button */}
            <motion.button
              onClick={handleSendOTP}
              disabled={phone.length < 9}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileTap={{ scale: 0.98 }}
            >
              Continue
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* OTP inputs */}
            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  className="w-12 h-14 text-center text-xl font-bold input-field"
                />
              ))}
            </div>

            {/* Resend */}
            <p className="text-center text-sm text-muted-foreground">
              Didn't receive the code?{' '}
              <button className="text-primary font-semibold">Resend</button>
            </p>

            {/* Verify button */}
            <motion.button
              onClick={handleVerifyOTP}
              disabled={otp.some((d) => !d)}
              className="w-full btn-accent flex items-center justify-center gap-2 disabled:opacity-50"
              whileTap={{ scale: 0.98 }}
            >
              Verify & Continue
              <ArrowRight size={20} />
            </motion.button>

            {/* Change number */}
            <button
              onClick={() => setShowOTP(false)}
              className="w-full text-center text-muted-foreground text-sm"
            >
              Change phone number
            </button>
          </motion.div>
        )}
      </div>

      {/* Guest option */}
      {!showOTP && (
        <motion.div
          className="px-6 pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground">or</span>
            </div>
          </div>

          <button
            onClick={handleGuestContinue}
            className="w-full btn-secondary flex items-center justify-center gap-2"
          >
            <User size={20} />
            Continue as Guest
          </button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Browse products without an account. Some features will be limited.
          </p>
        </motion.div>
      )}
    </div>
  );
}
