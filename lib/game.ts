export async function getActiveGame() {
  try {
    // active-win only works locally, not on Vercel/browser
    if (process.env.VERCEL || typeof window !== "undefined") {
      return {
        title: "Unknown Window",
        app: "Unknown App",
      };
    }

    const activeWin = (await import("active-win")).default;
    const win = await activeWin();

    return {
      title: win?.title || "Unknown Window",
      app: win?.owner?.name || "Unknown App",
    };
  } catch (err) {
    console.error(err);

    return {
      title: "Unknown Window",
      app: "Unknown App",
    };
  }
}