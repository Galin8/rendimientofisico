/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://rendimientofisico.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*", "/politica-de-privacidad", "/aviso-legal"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/api/" },
    ],
  },
  transform: async (config, path) => {
    // Exact priorities per path type
    const exactPriorities = {
      "/": 1.0,
      "/nutricion": 0.9,
      "/entrenamiento": 0.9,
      "/suplementos": 0.9,
      "/perder-peso": 0.9,
      "/sobre-nosotros": 0.5,
      "/contacto": 0.4,
    };

    // Article paths: /categoria/slug
    const isArticle = /^\/(nutricion|entrenamiento|suplementos|perder-peso)\/.+/.test(path);

    return {
      loc: path,
      changefreq: isArticle ? "monthly" : config.changefreq,
      priority: exactPriorities[path] ?? (isArticle ? 0.8 : config.priority),
      lastmod: new Date().toISOString(),
    };
  },
};
