// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Tag Manager - Script */}
        <Script
          id="google-tag-manager"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-W9FT9GB');
            `,
          }}
        />
        <Script
          id="hotjar-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
             (function (c, s, q, u, a, r, e) {
        c.hj=c.hj||function(){(c.hj.q=c.hj.q||[]).push(arguments)};
        c._hjSettings = { hjid: a };
        r = s.getElementsByTagName('head')[0];
        e = s.createElement('script');
        e.async = true;
        e.src = q + c._hjSettings.hjid + u;
        r.appendChild(e);
    })(window, document, 'https://static.hj.contentsquare.net/c/csq-', '.js', 5243173);
            `,
          }}
        />
        <link rel="icon" href="/indifavicon.webp" />
        <Script
          src="https://cdn.jsdelivr.net/npm/yup"
          strategy="afterInteractive"
          onLoad={() => console.log("✅ Yup Loaded")}
        />
        <script
          src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"
          defer
        ></script>
        <Script
          src="https://tracking.indi26.com/js/next_visit_tracking.js"
          strategy="afterInteractive"
          onLoad={() => console.log("✅ visit tracking loaded")}
        />
        <script src="https://cdn.jsdelivr.net/npm/toastify-js" defer></script>
        {/* <script src="/assets/visit_tracking.js" defer /> */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
        />
        <script
          src="https://tracking.indi26.com/js/old-next-register.js"
          defer
        ></script>
      </Head>
      <body>
        {/* Google Tag Manager - NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W9FT9GB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
