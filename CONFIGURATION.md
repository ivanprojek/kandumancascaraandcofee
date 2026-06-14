# Ngaduman Cascara & Coffee - Configuration Guide

Complete guide to customize the website for your specific needs.

## 📋 Table of Contents
1. [Brand Configuration](#brand-configuration)
2. [Color & Design](#color--design)
3. [Content Updates](#content-updates)
4. [Contact Information](#contact-information)
5. [Product Management](#product-management)
6. [Advanced Customization](#advanced-customization)

---

## 🏢 Brand Configuration

### Company Name
**File**: All HTML files  
**How to change**:
1. Find: `Ngaduman <span>Cascara & Coffee</span>`
2. Replace with your company name (or keep as-is for this project)
3. Keep the `<span>` tags for styling the second word

**Locations**:
- Navigation bar (appears on all pages)
- Footer sections
- Various headings

### Logo/Branding
**Current**: Text-based logo using HTML
**To add a logo image**:
```html
<!-- Replace this: -->
<div class="nav-logo">
  Kopi <span>Merapi</span>
</div>

<!-- With this: -->
<div class="nav-logo">
  <img src="assets/images/logo.png" alt="Ngaduman Cascara & Coffee" style="height: 40px;">
</div>
```

### Tagline/Description
**File**: `index.html`  
**Section**: Hero subtitle
```html
<p class="subtitle">
  Your new tagline here...
</p>
```

---

## 🎨 Color & Design

### Changing the Color Palette

**File**: `assets/css/styles.css`  
**Location**: `:root` section (lines 13-32)

```css
:root {
  /* Example: Change accent colors */
  --color-accent-primary: #D8C3A5;      /* Warm Beige */
  --color-accent-secondary: #B89B72;    /* Soft Brown */
  
  /* Update to your colors */
  --color-accent-primary: #YOUR_COLOR;
  --color-accent-secondary: #YOUR_COLOR;
}
```

### Main Colors

| Variable | Current | Usage | Notes |
|----------|---------|-------|-------|
| `--color-bg-primary` | #FFFFFF | Main background | Keep for whitespace |
| `--color-bg-secondary` | #F8F8F8 | Section backgrounds | Subtle contrast |
| `--color-text-primary` | #111111 | Main text | Nearly black |
| `--color-text-secondary` | #666666 | Secondary text | Medium gray |
| `--color-accent-primary` | #D8C3A5 | Beige accent | Primary brand color |
| `--color-accent-secondary` | #B89B72 | Brown accent | Secondary brand color |

### Typography Variables

**File**: `assets/css/styles.css` (lines 33-49)

```css
--fs-xs: 12px;      /* Extra small */
--fs-sm: 14px;      /* Small */
--fs-base: 16px;    /* Body text */
--fs-lg: 18px;      /* Large */
--fs-xl: 20px;      /* Extra large */
--fs-2xl: 24px;     /* Heading 4 */
--fs-3xl: 32px;     /* Heading 3 */
--fs-4xl: 40px;     /* Heading 2 */
--fs-5xl: 48px;     /* Large heading */
--fs-6xl: 56px;     /* Heading 1 part 1 */
--fs-7xl: 64px;     /* Heading 1 main */
```

**To change font sizes**:
```css
--fs-base: 16px;  /* Change to 18px for larger default text */
```

### Spacing Scale

**File**: `assets/css/styles.css` (lines 51-65)

Adjust these values to increase or decrease overall spacing:
```css
--sp-2: 4px;        /* Micro spacing */
--sp-4: 8px;        /* Small spacing */
--sp-8: 16px;       /* Base spacing */
--sp-16: 32px;      /* Medium spacing */
--sp-24: 48px;      /* Large spacing */
--sp-32: 64px;      /* Extra large spacing */
/* ... and more ... */
```

### Border Radius

**File**: `assets/css/styles.css` (lines 67-72)

Control roundedness of corners:
```css
--br-xs: 4px;      /* Very sharp */
--br-sm: 6px;      /* Sharp */
--br-md: 8px;      /* Slightly rounded */
--br-lg: 12px;     /* Rounded */
--br-xl: 16px;     /* Very rounded */
--br-2xl: 20px;    /* Extra rounded */
```

### Shadows

**File**: `assets/css/styles.css` (lines 74-80)

Control depth and elevation:
```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);      /* Subtle */
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);      /* Light */
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.08);      /* Medium */
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1);      /* Strong */
--shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.12);    /* Very strong */
```

---

## 📝 Content Updates

### Page 1: Our Story (index.html)

#### Hero Section
```html
<h1>Your Hero Headline Here</h1>
<p class="subtitle">
  Your compelling subheadline...
</p>
```

#### About Section
```html
<p style="font-size: var(--fs-lg); line-height: var(--lh-relaxed); color: var(--color-text-secondary);">
  Your company description here...
</p>
```

#### Vision & Mission
```html
<div class="card" data-reveal>
  <h3 style="color: var(--color-accent-secondary); margin-bottom: var(--sp-16);">Our Vision</h3>
  <p>Your vision statement here...</p>
</div>
```

#### Why Choose Us (4 Cards)
```html
<div class="card" data-reveal>
  <div class="card-title">
    <div class="card-icon">01</div>
    <div>
      <h4>Your Feature Title</h4>
    </div>
  </div>
  <p class="card-description">
    Your feature description here...
  </p>
</div>
```

#### Statistics
```html
<div class="card" data-reveal>
  <div class="card-number counter">YOUR_NUMBER</div>
  <div class="card-label">Your Label</div>
</div>
```

### Page 2: Collection (collection.html)

#### Adding/Editing Products
```html
<div class="product-card" data-category="arabica" data-reveal>
  <div class="product-image">
    <div class="product-placeholder">☕</div>
  </div>
  <div class="product-content">
    <h4 class="product-name">Product Name</h4>
    <p class="product-description">
      Product description here...
    </p>
    <div class="product-specs">
      <div class="product-spec">
        <span class="product-spec-label">Roast Level</span>
        <span class="product-spec-value">Light</span>
      </div>
      <!-- Add more specs -->
    </div>
    <div class="product-footer">
      <div class="product-price">$XX.XX</div>
      <span style="font-size: var(--fs-sm); color: var(--color-text-light);">250g</span>
    </div>
  </div>
</div>
```

#### Product Categories
Available categories (change `data-category`):
- `arabica` - Single-origin Arabica coffees
- `robusta` - Robusta varieties
- `blend` - Specialty blends

#### Comparison Table
Edit the table in the comparison section:
```html
<tr>
  <td><strong>Product Name</strong></td>
  <td>Light</td>
  <td>Aroma</td>
  <td>Medium</td>
  <td>High</td>
  <td>Washed</td>
  <td>250g</td>
  <td>$18.99</td>
</tr>
```

### Page 3: Contact (contact.html)

#### Contact Form Fields
All form fields are in the left column. To add/remove fields:
```html
<div class="form-field">
  <label class="form-label" for="fieldname">Label Text</label>
  <input class="form-input" type="text" id="fieldname" name="fieldname" placeholder="Placeholder">
</div>
```

#### Company Information
Update the right column:
```html
<h4 style="font-size: var(--fs-lg); color: var(--color-accent-secondary); margin-bottom: var(--sp-8);">Address</h4>
<p style="color: var(--color-text-secondary); line-height: var(--lh-relaxed);">
  Your Address Line 1<br>
  Your Address Line 2<br>
  City, Postal Code<br>
  Country
</p>
```

#### Partnership Cards
```html
<div class="card" data-reveal>
  <h4 style="color: var(--color-accent-secondary); margin-bottom: var(--sp-12);">Partnership Type</h4>
  <p class="card-description" style="margin-bottom: var(--sp-16);">
    Your partnership description...
  </p>
  <a href="#contact-form" class="btn-link">Learn More →</a>
</div>
```

#### FAQ Items
```html
<div class="accordion-item">
  <div class="accordion-header">
    <h4 style="margin: 0;">Your Question?</h4>
    <div class="accordion-icon">▼</div>
  </div>
  <div class="accordion-content">
    <div class="accordion-body">
      Your answer here...
    </div>
  </div>
</div>
```

---

## 📞 Contact Information

### Update Contact Details Across All Pages

**Locations to update**:
1. Contact page content
2. Footer sections (all 3 pages)
3. Company information card

**Fields to update**:

```
Email Addresses:
- niluh.osiniditami@gmail.com  → primary contact

Phone Numbers:
- +62 (your-number)            → Your phone number

Address:
- Kandangan, Kabupaten Temanggung, Jawa Tengah (Production Center)
- Kandangan, Kota Salatiga, Jawa Tengah (Distribution & Development)

Business Hours:
- Monday - Friday: 09:00 - 18:00
- Saturday: 10:00 - 16:00
- Sunday: Closed
```

### Update Map
**File**: `contact.html`  
**Location**: Map Section

Replace the iframe src with your Google Maps embed:
```html
<iframe 
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE" 
  width="100%" 
  height="100%" 
  style="border:none;" 
  allowfullscreen="" 
  loading="lazy" 
  referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

---

## 🛍️ Product Management

### Product Structure

Each product card follows this structure:
```
Product Card
├── Image (placeholder or real image)
├── Name
├── Description
├── Specifications
│   ├── Roast Level
│   ├── Aroma
│   ├── Body
│   └── Acidity
├── Size/Packaging
└── Price
```

### Adding New Products

1. **Duplicate** an existing product card
2. **Update** the data-category attribute (arabica, robusta, or blend)
3. **Fill in** product details
4. **Add** to the product grid

### Product Pricing

Update prices consistently:
```html
<div class="product-price">$YOUR_PRICE</div>
```

### Product Specifications

Available specifications to display:
- Roast Level (Light, Medium, Dark, etc.)
- Aroma (Floral, Berry, Chocolate, etc.)
- Body (Light, Medium, Full)
- Acidity (Low, Medium, High)
- Processing Method (Washed, Natural, Fermented)
- Packaging (g quantity)

---

## ⚙️ Advanced Customization

### Adding New Pages

1. **Create new HTML file**: `new-page.html`
2. **Copy navigation** from existing pages
3. **Update nav links** to include new page
4. **Link footer** to new page

### Adding New Sections

```html
<section id="section-id">
  <div class="container">
    <div class="section-title">
      <h2>Section Title</h2>
      <p>Section subtitle (optional)</p>
    </div>
    
    <div class="grid-3">
      <!-- Your content here -->
    </div>
  </div>
</section>
```

### Custom CSS Classes

Add to `assets/css/styles.css`:
```css
.your-custom-class {
  /* Your styles */
}
```

### JavaScript Customization

**File**: `assets/js/main.js`

To add custom functionality:
```javascript
// Add at the end of main.js
document.addEventListener('DOMContentLoaded', function() {
  // Your code here
});
```

### Form Submission

**Current**: Simulated submission with notification

**To enable real submissions**:
1. Use a form service (Formspree, Netlify Forms)
2. Set form action: `<form action="your-endpoint" method="POST">`
3. Or implement server-side processing

### Adding Google Analytics

Add to the end of all HTML files before `</body>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

### Adding Social Links

Update footer social icons:
```html
<div class="footer-social">
  <a href="https://instagram.com/yourprofile" aria-label="Instagram">👁</a>
  <a href="https://facebook.com/yourpage" aria-label="Facebook">f</a>
  <a href="https://linkedin.com/yourprofile" aria-label="LinkedIn">in</a>
</div>
```

---

## 🔍 Best Practices

### Content Guidelines
- Keep headlines short and impactful
- Use descriptive product names
- Write clear, benefit-focused descriptions
- Maintain consistent terminology
- Use professional language

### Performance Tips
- Optimize images before uploading
- Minimize CSS customizations
- Keep JavaScript functions efficient
- Test on mobile devices
- Check page load speed

### Accessibility Guidelines
- Use semantic HTML
- Add descriptive alt text for images
- Ensure color contrast ratios
- Test keyboard navigation
- Verify screen reader compatibility

### SEO Tips
- Update meta descriptions
- Use descriptive heading hierarchy
- Add alt text to all images
- Create descriptive URLs
- Add internal links between pages

---

## 📞 Quick Reference

| Task | File | Section |
|------|------|---------|
| Change brand name | All HTML | Navigation/Footer |
| Update colors | styles.css | :root variables |
| Edit hero text | Each HTML | Hero section |
| Add products | collection.html | Product grid |
| Update contact | contact.html | Contact section |
| Change spacing | styles.css | --sp-* variables |
| Add new section | Any HTML | After existing section |
| Update social links | Footer (all) | footer-social |

---

**Last Updated**: 2024  
**For Support**: Review inline code comments and CSS documentation
