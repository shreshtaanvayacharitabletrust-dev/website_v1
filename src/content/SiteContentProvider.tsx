import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { fetchSiteContent } from "../lib/directus";
import {
  defaultSiteContent,
  type SiteContent,
} from "./siteContent";

interface SiteContentContextValue {
  content: SiteContent;
  cmsLoaded: boolean;
}

const SiteContentContext = createContext<SiteContentContextValue>({
  content: defaultSiteContent,
  cmsLoaded: false,
});

export function SiteContentProvider({ children }: PropsWithChildren) {
  const [content, setContent] = useState(defaultSiteContent);
  const [cmsLoaded, setCmsLoaded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetchSiteContent(controller.signal)
      .then((nextContent) => {
        setContent(nextContent);
        setCmsLoaded(true);
      })
      .catch((error: unknown) => {
        if ((error as Error).name === "AbortError") {
          return;
        }

        console.warn("Using local fallback content because Directus content could not be loaded.", error);
      });

    return () => controller.abort();
  }, []);

  const value = useMemo(
    () => ({
      content,
      cmsLoaded,
    }),
    [cmsLoaded, content],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
