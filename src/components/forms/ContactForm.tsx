// src/components/forms/ContactForm.tsx
import { useState } from 'react';
import type { ContactFormData, ContactFormErrors } from '../../types/form';
import Input from '../Input';
import Button from '../Button';

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

    // Validate all fields
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
        
        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }, 1500);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-10 max-w-xl shadow-sm">
      <form onSubmit={handleSubmit} noValidate aria-label="İletişim Formu">
        <fieldset className="border-none p-0 space-y-5" disabled={isSubmitting}>
          <legend className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
            Mesaj Gönder
          </legend>

          {success && (
            <div role="alert" className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
              Mesajınız başarıyla gönderildi!
            </div>
          )}

          <div className="flex flex-col gap-1">
            <Input
              id="name"
              label="Ad Soyad"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Adınız Soyadınız"
              error={errors.name}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Input
              id="email"
              label="E-posta"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ornek@eposta.com"
              error={errors.email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Konu
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              className={`w-full rounded-xl border bg-white dark:bg-gray-800 px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary ${
                errors.subject
                  ? 'border-error focus:ring-error/50'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">-- Seçiniz --</option>
              <option value="is">İş Teklifi</option>
              <option value="soru">Soru</option>
              <option value="oneri">Öneri</option>
            </select>
            {errors.subject && (
              <p id="subject-error" role="alert" className="text-xs text-error dark:text-red-400 font-medium mt-1">
                {errors.subject}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Mesajınız</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Mesajınızı buraya yazınız…"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`w-full rounded-xl border bg-white dark:bg-gray-800 px-4 py-2.5 text-sm resize-y transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary ${
                  errors.message
                    ? 'border-error focus:ring-error/50'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
            />
             {errors.message && (
              <p id="message-error" role="alert" className="text-xs text-error dark:text-red-400 font-medium mt-1">
                {errors.message}
              </p>
            )}
          </div>

          <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
