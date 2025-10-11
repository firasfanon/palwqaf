import React, { useState, useEffect } from 'react';
import { X, Crown, Building, Users, FileText, MapPin, Star, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'مرحباً بك في موقع وزارة الأوقاف',
      description: 'نظام إدارة متكامل للأوقاف الإسلامية في فلسطين',
      icon: Crown,
      color: 'from-islamic-500 to-islamic-600'
    },
    {
      title: 'استكشف خدماتنا المتنوعة',
      description: 'من إدارة المساجد إلى الخدمات الاجتماعية والتعليمية',
      icon: Building,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'تواصل معنا بسهولة',
      description: 'نحن هنا لخدمتك في أي وقت عبر قنوات التواصل المختلفة',
      icon: Users,
      color: 'from-green-500 to-green-600'
    }
  ];

  const features = [
    { name: 'الأخبار والإعلانات', href: '/news', icon: FileText },
    { name: 'المساجد والأوقاف', href: '/mosques', icon: Building },
    { name: 'الخدمات الإلكترونية', href: '/e-services', icon: Star },
    { name: 'اتصل بنا', href: '/contact', icon: MapPin }
  ];

  if (!isOpen) return null;

  const { icon: Icon } = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="heading-2 text-islamic-800">مرحباً بك</h2>
          <button
            onClick={onClose}
            className="text-sage-500 hover:text-sage-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mb-8">
          <div className={`w-24 h-24 bg-gradient-to-br ${steps[currentStep].color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl`}>
            <Icon className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-islamic-800 mb-4 font-display">
            {steps[currentStep].title}
          </h3>
          <p className="text-sage-600 font-body leading-relaxed">
            {steps[currentStep].description}
          </p>
        </div>

        {currentStep === steps.length - 1 && (
          <div className="mb-8">
            <h4 className="font-semibold text-islamic-800 mb-4 font-display">ابدأ الاستكشاف:</h4>
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature) => (
                <Link
                  key={feature.name}
                  to={feature.href}
                  onClick={onClose}
                  className="flex items-center space-x-2 space-x-reverse p-3 bg-islamic-50 rounded-lg hover:bg-islamic-100 transition-colors group"
                >
                  <feature.icon className="w-5 h-5 text-islamic-600" />
                  <span className="font-body text-islamic-800 group-hover:text-islamic-600">
                    {feature.name}
                  </span>
                  <ArrowLeft className="w-4 h-4 text-islamic-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex space-x-2 space-x-reverse">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep ? 'bg-islamic-600' : 'bg-sage-300'
                }`}
              />
            ))}
          </div>
          
          <div className="flex space-x-3 space-x-reverse">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="btn-outline"
              >
                السابق
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="btn-primary"
              >
                التالي
              </button>
            ) : (
              <button
                onClick={onClose}
                className="btn-primary"
              >
                ابدأ الاستكشاف
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;