# 🎨 Creating Open Graph Image

## What is an OG Image?

The Open Graph image is what appears when you share your website link on social media (Facebook, LinkedIn, Twitter, WhatsApp, etc.).

## Specifications

- **Size:** 1200 x 630 pixels (required)
- **Format:** JPG or PNG (WebP also works)
- **File size:** Under 1MB
- **Aspect ratio:** 1.91:1

## Design Recommendations

### Content to Include:
1. **Your Name** (large, bold)
2. **Your Title/Role**
3. **Key Achievement or Tagline**
4. **Professional Photo** (optional but recommended)
5. **Brand Color** (use your purple: #9333ea)

### Design Tips:
- Keep text large and readable (even on mobile)
- Use high contrast
- Don't put important content near edges (safe zone: 40px margin)
- Test how it looks on different platforms

## Option 1: Use Canva (Recommended - Easy)

1. Go to [Canva.com](https://canva.com)
2. Create custom size: 1200 x 630 px
3. Use this template idea:

```
┌─────────────────────────────────────────┐
│                                         │
│  [Your Photo]    Abdullah Shaban        │
│   (Circle)       Fouad Sayed            │
│                                         │
│                  Operations &           │
│                  Automation Specialist  │
│                                         │
│                  ✓ 5+ Years Experience  │
│                  ✓ 40% Efficiency Gains │
│                  ✓ 50+ Projects         │
│                                         │
└─────────────────────────────────────────┘
```

4. Download as PNG
5. Save as: `public/og-image.jpg`

## Option 2: Use Figma (For Designers)

1. Create frame: 1200 x 630
2. Design your image
3. Export as PNG or JPG
4. Save as: `public/og-image.jpg`

## Option 3: Use Online Tools

- [OG Image Generator](https://og-image.vercel.app/)
- [Social Image Generator](https://www.bannerbear.com/tools/social-image-generator/)
- [Meta Tags](https://metatags.io/)

## After Creating the Image

1. Save the image as: `public/og-image.jpg`
2. Update `src/components/SEO.tsx`:
   ```typescript
   image = "https://YOUR-DOMAIN.com/og-image.jpg"
   url = "https://YOUR-DOMAIN.com"
   ```

## Testing Your OG Image

### Before Deployment:
- Use a temporary hosting service like [Imgur](https://imgur.com) to upload your image
- Update the SEO component with the temporary URL
- Test locally

### After Deployment:
1. **Facebook Debugger:** https://developers.facebook.com/tools/debug/
2. **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/
3. **Twitter Card Validator:** https://cards-dev.twitter.com/validator
4. **OpenGraph.xyz:** https://www.opengraph.xyz/

### Common Issues:

**Image not showing:**
- Clear cache on testing tools
- Make sure image is publicly accessible
- Check image size (must be under 1MB)
- Verify image URL is correct

**Image looks wrong:**
- Check dimensions (1200x630)
- Ensure text is readable
- Test on multiple platforms

## Example OG Images for Inspiration

Search Google for:
- "portfolio og image examples"
- "developer social media card"
- "professional og image design"

---

**Next Steps After Creating OG Image:**
1. Place image in `public/og-image.jpg`
2. Update SEO.tsx with your actual domain
3. Test with the tools above
4. Deploy and verify on social media
