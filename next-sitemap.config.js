/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://rendimientofisico.es",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*", "/politica-de-privacidad", "/aviso-legal"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/api/" },
    ],
    additionalSitemaps: ["https://rendimientofisico.es/sitemap.xml"],
  },
  transform: async (config, path) => {
    const priorities = {
      "/": 1.0,
      "/nutricion": 0.9,
      "/entrenamiento": 0.9,
      "/suplementos": 0.9,
      "/perder-peso": 0.9,
    };
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] ?? config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
