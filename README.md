
# Foodly King - Maxfiy Boshqaruv Paneli

Ushbu loyiha Foodly King tizimi uchun maxsus 2D Flat (Neo-brutalist) uslubida yaratilgan maxfiy portaldir.

## Vercel Sozlamalari (Environment Variables)
Loyihani Vercel-ga yuklaganingizdan so'ng, **Settings -> Environment Variables** bo'limiga quyidagi o'zgaruvchilarni qo'shing:

| Key | Value (Supabase Dashboard-dan olinadi) |
|-----|---------------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon / public API Key |

## GitHub-ga yuklash (Main branch)

Ushbu buyruqlarni Firebase Studio **Terminal** oynasiga ketma-ket nusxalab tashlang va har biridan keyin Enter bosing:

```bash
# 1. O'zgarishlarni saqlash
git add .

# 2. Commit qilish
git commit -m "Vercel va Supabase sozlamalari yangilandi"

# 3. Kodni GitHub-ga yuklash
git push origin main
```

## Texnologiyalar va Xususiyatlar
- **Framework:** Next.js 15 (App Router)
- **Database & Auth:** Supabase
- **Dizayn:** 2D Flat / Neo-brutalist Design
- **Ranglar:** To'q sariq (#E0701C), Feruza (#30D5C8), Oq
- **Xavfsizlik:** Faqat `role === 'king'` bo'lgan foydalanuvchilar kira oladi.
