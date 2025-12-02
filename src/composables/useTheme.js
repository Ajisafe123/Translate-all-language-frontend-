import { ref, watch, onMounted } from "vue";

export function useTheme() {
  const isDark = ref(true);

  const initTheme = () => {
    // Check localStorage first
    const saved = localStorage.getItem("userSettings");
    const useSystemTheme = localStorage.getItem("useSystemTheme");

    if (saved && useSystemTheme === "false") {
      const settings = JSON.parse(saved);
      if ("themeMode" in settings) {
        // Manual theme preference exists
        isDark.value = settings.themeMode === "dark";
        applyTheme();
        return;
      }
    }

    // Check system preference if no manual setting
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    isDark.value = prefersDark;
    applyTheme();
  };

  const applyTheme = () => {
    const html = document.documentElement;
    if (isDark.value) {
      html.classList.add("dark");
      document.body.style.colorScheme = "dark";
    } else {
      html.classList.remove("dark");
      document.body.style.colorScheme = "light";
    }
  };

  const setTheme = (dark) => {
    isDark.value = Boolean(dark);
    applyTheme();
    // Persist to localStorage
    const saved = localStorage.getItem("userSettings") || "{}";
    const settings = JSON.parse(saved);
    settings.themeMode = dark ? "dark" : "light";
    localStorage.setItem("userSettings", JSON.stringify(settings));
  };

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    applyTheme();
  };

  // Watch system theme changes
  onMounted(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      const useSystemTheme = localStorage.getItem("useSystemTheme") !== "false";
      if (useSystemTheme) {
        isDark.value = e.matches;
        applyTheme();
      }
    };

    if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    } else {
      mediaQuery.addEventListener("change", handleChange);
    }
  });

  return {
    isDark,
    initTheme,
    setTheme,
    toggleTheme,
    applyTheme,
  };
}
