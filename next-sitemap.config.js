// next-sitemap.config.js
module.exports = {
    siteUrl: 'https://alpha-portofolio.vercel.app',
    generateRobotsTxt: true, // tetap generate robots.txt
    exclude: ['/admin*', '/api*'], // exclude route yang tidak perlu
    priority: 1.0, // Prioritas maksimal karena hanya 1 halaman
    changefreq: 'monthly', // Tidak perlu 'daily' untuk portofolio statis
    autoLastmod: false, // Tidak perlu lastmod karena jarang update
    
    // Sitemap khusus 1 halaman
    transform: (config, path) => {
      // Hanya include path '/' (homepage)
      if (path === '/') {
        return {
          loc: path,
          priority: 1.0,
          changefreq: 'monthly',
        }
      }
      return null // Abaikan semua path lain
    },
  
    // Alternatif lebih simpel (Next.js v14+):
    // routes: ['/'] // Hanya generate untuk homepage
  }