# Ngaduman Cascara & Coffee - Premium Coffee Company Website

A modern, minimalist, and elegant multi-page website for a premium coffee company. Designed with a focus on clean aesthetics, whitespace, and sophisticated user experience reminiscent of premium brands like Apple, Notion, and Stripe.

## 🎨 Design Philosophy

- **Ultra Clean & Minimalist**: 90% whitespace with intentional design
- **Premium & Elegant**: Luxury aesthetic with sophisticated interactions
- **Fresh & Natural**: Warm color palette with natural tones
- **Modern & Professional**: Contemporary design patterns and typography
- **Fully Responsive**: Optimized for mobile, tablet, and desktop

## 📁 Project Structure

```
merapi-kopi/
├── index.html                  # Our Story Page
├── collection.html             # Coffee Collection Page  
├── contact.html                # Contact & Partnership Page
├── assets/
│   ├── css/
│   │   └── styles.css         # Main stylesheet with design system
│   ├── js/
│   │   └── main.js            # JavaScript for interactivity
│   └── images/                # (Optional) Image assets directory
└── README.md                   # This file
```

## 🎯 Pages Overview

### Page 1: Our Story (`index.html`)
- **Hero Section**: Compelling headline with CTA buttons
- **About Company**: Company background and philosophy
- **Vision & Mission**: Elegant card-based layout
- **Why Choose Us**: 4 feature cards highlighting key benefits
- **Statistics Section**: Animated counters showing company milestones
- **Company Values**: Icon-based value cards
- **Call to Action**: Final engagement section
- **Modern Footer**: Navigation, links, and social media

### Page 2: Coffee Collection (`collection.html`)
- **Hero Section**: Collection introduction
- **Product Showcase**: 9 premium product cards with detailed specs
- **Category Filter**: Interactive filter buttons (All, Arabica, Robusta, Specialty Blend)
- **Featured Collections**: Curated product selection highlights
- **Product Comparison**: Modern comparison table
- **Call to Action**: Order encouragement section
- **Modern Footer**: Product-focused navigation

### Page 3: Contact & Partnership (`contact.html`)
- **Hero Section**: Connection-focused introduction
- **Contact Section**: Contact form + company information (2-column layout)
- **Map Section**: Embedded Google Maps
- **Partnership Section**: 4 partnership opportunity cards
- **FAQ Section**: Accordion-style frequently asked questions
- **Final CTA**: Engagement section
- **Modern Footer**: Partnership-focused links

## 🎨 Color Palette

```
Primary Background:     #FFFFFF (Pure White)
Secondary Background:   #F8F8F8 (Soft Light Gray)
Text Primary:          #111111 (Deep Black)
Text Secondary:        #666666 (Medium Gray)
Text Light:            #999999 (Light Gray)
Accent Primary:        #D8C3A5 (Warm Beige)
Accent Secondary:      #B89B72 (Soft Earth Brown)
Border:                #E8E8E8 (Light Border)
```

## 🔤 Typography

- **Headings**: Inter, Manrope, or Plus Jakarta Sans (system fonts)
- **Body Text**: Inter (system fonts)
- **Font Scale**: 7 levels (12px to 64px)
- **Line Height**: Variable (1.2 to 1.875)

## ✨ Key Features

### Design System
- Complete CSS custom properties (CSS variables)
- Modular spacing scale
- Consistent border radius and shadows
- Smooth transitions and animations
- Responsive grid system

### Interactive Components
- **Navigation**: Sticky header with smooth scrolling
- **Filters**: Interactive product filtering by category
- **Accordions**: Expandable FAQ items
- **Animations**: Smooth fade-in effects on scroll
- **Forms**: Validated contact form with user feedback
- **Counters**: Animated statistics with IntersectionObserver
- **Scroll-to-Top**: Fixed button for easy navigation

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px
- Touch-friendly interface
- Optimized typography for all screens
- Flexible grid layouts

### Accessibility
- Semantic HTML structure
- ARIA labels for interactive elements
- Screen reader optimizations
- Keyboard navigation support
- High contrast colors

### Performance
- Lightweight CSS (no frameworks)
- Vanilla JavaScript (no dependencies)
- Lazy animations with IntersectionObserver
- Optimized for fast loading

## 🚀 Getting Started

### Quick Start
1. **Open in Browser**: Simply open any HTML file in a web browser
   ```
   Open index.html in your browser
   ```

2. **Local Server** (recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js http-server
   npx http-server
   ```
   Then visit: `http://localhost:8000`

3. **Modify Content**: Edit HTML files directly to customize content

## 📝 Customization Guide

### Change Brand Name
Find and replace "Ngaduman Cascara & Coffee" where needed throughout the files.

### Update Contact Information
Edit the footer and contact page with your actual business details:
- Phone numbers
- Email addresses
- Physical address
- Business hours

### Modify Product Data
Update product cards in `collection.html` with real product information:
- Product names and descriptions
- Specifications and pricing
- Images (replace emoji placeholders)

### Change Colors
Update CSS variables in `styles.css`:
```css
:root {
  --color-accent-primary: #D8C3A5;    /* Change these */
  --color-accent-secondary: #B89B72;
}
```

### Add Custom Images
1. Create `assets/images/` directory
2. Add your images there
3. Update HTML to reference images instead of placeholders:
   ```html
   <img src="assets/images/your-image.jpg" alt="Description">
   ```

### Update Navigation Links
Modify the navigation menu URLs to match your site structure.

## 🔧 JavaScript Features

### Form Validation
- Email format validation
- Required field checking
- User-friendly error messages

### Interactive Filtering
- Product category filtering
- Smooth animations
- Dynamic grid updates

### Scroll Interactions
- Scroll-based navigation styling
- Smooth scroll behavior
- Reveal animations on scroll

### Accordion System
- Toggle FAQ items
- Only one open at a time option
- Smooth height transitions

### Utility Functions
- Mobile detection
- Notification system
- Scroll utilities

## 📱 Responsive Breakpoints

| Device | Width | Breakpoint |
|--------|-------|-----------|
| Mobile | < 480px | xs |
| Tablet | 480-768px | sm |
| Tablet Large | 768-1024px | md |
| Desktop | > 1024px | lg |

## 🎭 Design Patterns

### Cards
- Minimal elevation with subtle shadows
- Smooth hover effects
- Consistent padding and spacing

### Buttons
- Clear visual hierarchy
- Multiple styles (primary, secondary, accent)
- Hover and active states

### Forms
- Clean input styling
- Clear label hierarchy
- Responsive layouts
- Error state handling

### Typography
- Strong visual hierarchy
- Generous line-height
- Optimized readability
- Letter-spacing for elegance

## ⚙️ Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📦 File Sizes

- `styles.css`: ~45KB (minimalist approach)
- `main.js`: ~15KB (vanilla JavaScript)
- HTML files: ~20-30KB each

## 🔐 Security Considerations

- Form submission is simulated (no backend processing)
- To handle form submissions, implement backend processing
- Consider using form services like Formspree, Netlify Forms, or custom API

## 📈 SEO Optimization

### Implemented
- Semantic HTML5
- Meta descriptions
- Alt text for images
- Proper heading hierarchy
- Mobile-friendly design

### To Improve
- Add structured data (JSON-LD)
- Implement Open Graph meta tags
- Add sitemap.xml
- Create robots.txt
- Optimize images with compression

## 🎓 Learning Resources

This project demonstrates:
- Modern CSS (Variables, Grid, Flexbox)
- Vanilla JavaScript (ES6+, DOM API, Intersection Observer)
- Responsive Web Design
- Accessibility Best Practices
- UX/UI Design Principles
- Performance Optimization

## 📄 License

This is a custom project template. Feel free to modify and use for your purposes.

## 🤝 Support

For customization or questions:
1. Review the code comments
2. Check CSS variables for styling
3. Examine JavaScript functions
4. Refer to HTML structure

---

**Created**: 2024
**Design Inspiration**: Apple, Notion, Stripe, Linear
**Technology**: HTML5, CSS3, Vanilla JavaScript
