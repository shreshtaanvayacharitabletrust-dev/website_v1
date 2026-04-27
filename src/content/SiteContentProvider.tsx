import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
import { fetchSiteContent } from "../lib/siteContentApi";
import {
  defaultSiteContent,
  type SiteContent,
} from "./siteContent";

interface SiteContentContextValue {
  content: SiteContent;
  cmsLoaded: boolean;
  refreshContent: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextValue>({
  content: defaultSiteContent,
  cmsLoaded: false,
  refreshContent: async () => undefined,
});

export function SiteContentProvider({ children }: PropsWithChildren) {
  const [content, setContent] = useState(defaultSiteContent);
  const [cmsLoaded, setCmsLoaded] = useState(false);

  const refreshContent = useCallback(async () => {
    const nextContent = await fetchSiteContent();

    setContent(nextContent);
    setCmsLoaded(true);
  }, []);

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

        console.warn(
          "Using local fallback content because Cloudflare CMS content could not be loaded.",
          error,
        );
      });

    return () => controller.abort();
  }, []);

  const value = useMemo(
    () => ({
      content,
      cmsLoaded,
      refreshContent,
    }),
    [cmsLoaded, content, refreshContent],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
