# EmailJS Setup

ضع هذه القيم في `.env.local` محليًا، وفي Vercel > Project Settings > Environment Variables للإنتاج.

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_mds4xqz
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=pxohact
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=4Wo0xfXaCf10ai2Ij
```

> لا تستخدم Private Key في الفرونت نهائيًا. استخدم Public Key فقط.

## Template variables

تأكد أن Template في EmailJS يستخدم المتغيرات التالية:

- `{{name}}`
- `{{email}}`
- `{{phone}}`
- `{{service}}`
- `{{title}}`
- `{{message}}`
- `{{page_url}}`

القالب الحالي الظاهر في الصور يستخدم `{{name}}`, `{{title}}`, `{{message}}`, و Reply To = `{{email}}`، لذلك سيعمل.
