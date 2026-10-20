export default function manifest() {
  return {
    id: "/",
    name: "Uni Event",
    short_name: "Uni Event",
    description: "Sistema de gestion academica unerg",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f2eb",
    theme_color: "#00e699",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

/** 
export default function manifest() {
  return {
    id: "/",
    name: "Uni Event",
    short_name: "Uni Event",
    description: "Sistema de gestion academica unerg",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f2eb",
    theme_color: "#174a45",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
    ],
  };
}
*/
