#!/bin/bash
# LAB-6: 'gh pr create' komut şablonu (Özet ve Test Planı içerir)

gh pr create \
  --title "feat(lab-6): Ara Checkpoint 1 - Atomic Design & State Yönetimi" \
  --body "## 📝 Özet
LAB-6 hedefleri doğrultusunda monolitik \`App.tsx\` dosyası uçtan uca refactor edildi ve Atomic Design prensiplerine göre parçalandı. Tüm uygulama \`UI = f(state)\` yaklaşımı ile yeniden modellendi.

## ✨ Yapılan Değişiklikler
- **Atomic Design:** Header, Footer, Hero, About, Skills, ProjectList, ContactForm ve ProjectFilter bileşenleri eklendi.
- **Strict TypeScript:** Form state'leri (\`ContactFormData\`, \`ContactFormErrors\`) tanımlandı, projede \`any\` kullanımı engellendi ve Props/State tanımlamaları yapıldı.
- **Performans Optimizasyonları:** \`ProjectList.tsx\` içerisinde liste filtreleme ve sıralama operasyonları \`useMemo\` ile sarmalanarak render optimize edildi.
- **Controlled Forms:** \`ContactForm.tsx\` baştan yazılarak kontrollü bileşen (controlled component) haline getirildi. \`onChange\` event'leri esnasında anlık doğrulama (validation) ve submit esnasında \`isSubmitting\` stratejisi eklendi.

## 🧪 Test Planı
- [ ] Responsive düzen test edilmeli (mobil menü açık/kapalı durumu).
- [ ] Filtreleme kombinasyonları ve kategori geçişleri test edilmeli (performans açısından UI donması olup olmadığı incelenmeli).
- [ ] İletişim formunda eksik giriş yapılıp hata mesajları (Ad Soyad, E-posta, Konu, Mesaj kuralları) doğrulanmalı.
- [ ] Dark Mode toggle işlevselliği tüm bileşenlerde teyit edilmeli." \
  --base master \
  --head feature/checkpoint-1
