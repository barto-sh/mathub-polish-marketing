const DEFAULT_HEADER_OFFSET = 72;

type ScrollToHashOptions = {
  delay?: number;
  headerOffset?: number;
};

export const scrollToHash = (
  hash: string,
  { delay, headerOffset = DEFAULT_HEADER_OFFSET }: ScrollToHashOptions = {}
) => {
  if (!hash.startsWith("#")) return false;

  const scroll = () => {
    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = "auto";
    window.scrollTo({ top, behavior: "auto" });
    root.style.scrollBehavior = previousScrollBehavior;
    window.history.pushState(null, "", hash);
  };

  if (typeof delay === "number") {
    window.setTimeout(scroll, delay);
  } else {
    scroll();
  }

  return true;
};
