// src/types/form.ts
// LAB-6: Form Tipleri

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface FilterOption {
  value: string;
  label: string;
}
