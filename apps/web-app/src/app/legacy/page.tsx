"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Legacy?: {
      mount: (domId: string) => void;
      unmount: () => void;
    };
  }
}

export default function LegacyPage() {
  const scriptsLoadedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function loadScriptsAndMount() {
      if (scriptsLoadedRef.current) {
        window.Legacy?.mount("legacy-root");
        return;
      }

      // 1) Load ExtJS CSS theme
      await loadStylesheet(
        "https://cdn.sencha.com/ext/commercial/7.2.0/build/classic/theme-triton/resources/theme-triton-all.css"
      );

      if (cancelled) return;

      // 2) Load ExtJS from CDN (commercial version for POC)
      await loadScript(
        "https://cdn.sencha.com/ext/commercial/7.2.0/build/ext-all.js"
      );

      if (cancelled) return;

      // 3) Load our minified legacy app that defines window.Legacy
      await loadScript("/legacy/legacy-app.min.js");

      if (cancelled) return;

      scriptsLoadedRef.current = true;
      window.Legacy?.mount("legacy-root");
    }

    loadScriptsAndMount();

    return () => {
      cancelled = true;
      if (window.Legacy) {
        window.Legacy.unmount();
      }
    };
  }, []);

  return (
    <div>
      <h1>Legacy (ExtJS POC)</h1>
      <p>
        This page is rendered by Next.js, but the content below is an ExtJS
        example app mounted into a React-controlled container.
      </p>
      <div
        id="legacy-root"
        style={{ border: "1px solid #ddd", minHeight: 400, marginTop: 16 }}
      />
    </div>
  );
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // See if we already loaded this script
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

function loadStylesheet(href: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // See if we already loaded this stylesheet
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve();
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load ${href}`));
    document.head.appendChild(link);
  });
}

