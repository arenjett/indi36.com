import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  const queryString = new URLSearchParams(
    query as Record<string, string>
  ).toString();

  const manifest = {
    name: "Indibet",
    short_name: "Indibet",
    start_url: `/index2?${queryString}`,
    scope: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone"],
    background_color: "#ffffff",
    theme_color: "#ffffff",
    description:
      "Indibet is a rapidly growing online gambling and betting platform with a focus on sports betting and casino gaming.",
    icons: [
      { src: "/icon-72.webp", sizes: "72x72", type: "image/webp" },
      { src: "/icon-96.webp", sizes: "96x96", type: "image/webp" },
      { src: "/icon-144.webp", sizes: "144x144", type: "image/webp" },
      { src: "/icon-192.webp", sizes: "192x192", type: "image/webp" },
      { src: "/icon-512.webp", sizes: "512x512", type: "image/webp" },
    ],
    prefer_related_applications: true,
    edge_side_panel: {
      preferred_width: 496,
    },
    related_applications: [
      {
        platform: "webapp",
        url: "manifest.json",
      },
    ],
    screenshots: [
      { src: "/assets/pwa/shot1.webp", type: "image/webp", sizes: "330x587" },
      { src: "/assets/pwa/shot2.webp", type: "image/webp", sizes: "330x587" },
      { src: "/assets/pwa/shot3.webp", type: "image/webp", sizes: "330x587" },
      { src: "/assets/pwa/shot4.webp", type: "image/webp", sizes: "330x587" },
    ],
  };

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  res.setHeader("Content-Type", "application/manifest+json");
  res.status(200).json(manifest);
}
