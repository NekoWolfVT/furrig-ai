export async function getScreenBase64() {
  try {
    // screenshot-desktop only works locally, not on Vercel/browser
    if (process.env.VERCEL || typeof window !== "undefined") {
      return null;
    }

    const screenshot = (await import("screenshot-desktop")).default;
    const img = await screenshot({ format: "png" });

    return img.toString("base64");
  } catch (err) {
    console.error(err);
    return null;
  }
}