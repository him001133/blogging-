# Modern Blog

A modern, SEO-optimized blogging platform designed for GitHub Pages. Built with performance, accessibility, and search engine ranking in mind.

## Features

✨ **Modern Design**
- Clean, responsive layout that works on all devices
- Dark/Light mode toggle with persistence
- Smooth animations and transitions
- Professional typography and spacing

🚀 **Performance Optimized**
- Minimal CSS and JavaScript
- Lazy loading images
- Critical resource preloading
- No external dependencies (except optional lazy loading fallback)

🔍 **SEO Ready**
- Semantic HTML5 structure
- Meta tags for search engines
- Open Graph & Twitter Card support
- Schema.org structured data
- Canonical URLs
- Sitemap ready
- robots.txt compatible

♿ **Accessible**
- WCAG 2.1 compliant
- Keyboard navigation support
- Screen reader friendly
- Skip links
- ARIA labels and roles
- Focus management

📱 **Responsive**
- Mobile-first design
- Breakpoints for all screen sizes
- Touch-friendly interface
- Progressive enhancement

## Quick Start

### 1. Fork/Clone this Repository

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### 2. Customize the Blog

Edit `index.html` to update:
- Site title and description
- Author information
- Social media links
- Featured articles
- Categories

### 3. Update Meta Tags

In `index.html`, update these important SEO meta tags:

```html
<meta name="description" content="Your blog description">
<meta name="keywords" content="your, keywords, here">
<meta name="author" content="Your Name">
<meta property="og:url" content="https://yourusername.github.io/your-repo/">
<link rel="canonical" href="https://yourusername.github.io/your-repo/">
```

### 4. Add Your Content

Create new blog posts in the `/posts/` directory. Each post should be an HTML file with proper meta tags.

### 5. Deploy to GitHub Pages

1. Push your code to GitHub
2. Go to Settings > Pages
3. Select branch: `main` and folder: `/ (root)`
4. Save

Your site will be live at: `https://yourusername.github.io/your-repo/`

## File Structure

```
├── index.html              # Homepage
├── styles/
│   └── main.css           # Main stylesheet
├── scripts/
│   └── main.js            # JavaScript functionality
├── assets/
│   ├── images/            # Blog post images
│   └── favicon.svg        # Site favicon
├── posts/                 # Blog posts directory
└── categories/            # Category pages
```

## SEO Best Practices

This blog is optimized for search engines with:

1. **Semantic HTML** - Proper heading hierarchy and landmarks
2. **Meta Tags** - Title, description, keywords, Open Graph
3. **Structured Data** - Schema.org JSON-LD
4. **Performance** - Fast loading times (Core Web Vitals)
5. **Mobile-Friendly** - Responsive design
6. **Accessibility** - WCAG compliance

---

Built with ❤️ for the web
