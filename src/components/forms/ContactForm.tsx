// src/components/forms/ContactForm.tsx
import { useState } from 'react';
import type { ContactFormData, ContactFormErrors } from '../../types/form';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const validate = (name: string, value: string) => {
    let error = '';
    if (name === 'name' && value.trim().length < 2) {
      error = 'Ad Soyad en az 2 karakter olmalıdır.';
    } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Geçerli bir e-posta adresi giriniz.';
    } else if (name === 'subject' && value.trim() === '') {
      error = 'Lütfen bir konu seçiniz.';
    } else if (name === 'message' && value.trim().length < 10) {
      error = 'Mesajınız en az 10 karakter olmalıdır.';
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isNameValid = validate('name', formData.name);
    const isEmailValid = validate('email', formData.email);
    const isSubjectValid = validate('subject', formData.subject);
    const isMessageValid = validate('message', formData.message);

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Hide success message after 4 seconds
        setTimeout(() => setSuccess(false), 4000);
      }, 1500);
    }
  };

  return (
    <div className="bg-white/60 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/5 rounded-[2rem] p-8 sm:p-12 max-w-2xl mx-auto shadow-xl shadow-gray-200/20 dark:shadow-none backdrop-blur-3xl animate-slide-up relative">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <form onSubmit={handleSubmit} noValidate aria-label="İletişim Formu" className="relative z-10">
        <fieldset className="border-none p-0 space-y-7" disabled={isSubmitting}>
          {success && (
            <div role="alert" className="p-5 mb-6 text-sm font-medium text-success dark:text-green-300 rounded-2xl bg-success/10 dark:bg-success/20 animate-fade-in flex items-center gap-3">
              <span className="text-xl">✨</span> Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağım.
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                Ad Soyad
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Adınız Soyadınız"
                className={`w-full rounded-2xl border bg-white/50 dark:bg-black/20 px-5 py-3.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent ${
                  errors.name
                    ? 'border-error focus:ring-error/50 bg-error/5 dark:bg-error/5'
                    : 'border-gray-200 dark:border-white/10'
                }`}
              />
              {errors.name && (
                <p id="name-error" role="alert" className="text-xs text-error dark:text-red-400 font-medium ml-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                E-posta Adresi
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ornek@eposta.com"
                className={`w-full rounded-2xl border bg-white/50 dark:bg-black/20 px-5 py-3.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent ${
                  errors.email
                    ? 'border-error focus:ring-error/50 bg-error/5 dark:bg-error/5'
                    : 'border-gray-200 dark:border-white/10'
                }`}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="text-xs text-error dark:text-red-400 font-medium ml-1">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
              Konu
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              className={`w-full rounded-2xl border bg-white/50 dark:bg-black/20 px-5 py-3.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent appearance-none cursor-pointer ${
                errors.subject
                  ? 'border-error focus:ring-error/50 bg-error/5 dark:bg-error/5'
                  : 'border-gray-200 dark:border-white/10'
              }`}
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
            >
              <option value="">-- Genel bir konu seçebilirsiniz --</option>
              <option value="is">İş Teklifi / Proje</option>
              <option value="soru">Teknik Soru</option>
              <option value="diger">Diğer</option>
            </select>
            {errors.subject && (
              <p id="subject-error" role="alert" className="text-xs text-error dark:text-red-400 font-medium ml-1">
                {errors.subject}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
              Mesajınız
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Fikirlerinizi detaylandırın..."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`w-full rounded-2xl border bg-white/50 dark:bg-black/20 px-5 py-3.5 text-sm resize-y transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent ${
                  errors.message
                    ? 'border-error focus:ring-error/50 bg-error/5 dark:bg-error/5'
                    : 'border-gray-200 dark:border-white/10'
                }`}
            />
             {errors.message && (
              <p id="message-error" role="alert" className="text-xs text-error dark:text-red-400 font-medium ml-1">
                {errors.message}
              </p>
            )}
          </div>

          <div className="pt-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary text-white font-medium hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-[#070B14] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                    <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                    Gönderiliyor...
                    </>
                ) : '🚀 Mesajı Gönder'}
              </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
