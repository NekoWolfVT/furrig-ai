import OBSWebSocket from "obs-websocket-js";

const obs = new OBSWebSocket();

let connected = false;

export async function getObsInfo() {
  try {
    if (!connected) {
      await obs.connect(
        process.env.OBS_WEBSOCKET_URL!,
        process.env.OBS_WEBSOCKET_PASSWORD!
      );

      connected = true;

      console.log("✅ Connected to OBS WebSocket");
    }

    const scene = await obs.call("GetCurrentProgramScene");

    const items = await obs.call("GetSceneItemList", {
      sceneName: scene.currentProgramSceneName,
    });

    const sourceNames = items.sceneItems
      .map((item) => item.sourceName)
      .join(", ");

    return {
      sceneName: scene.currentProgramSceneName,
      sources: sourceNames,
    };
  } catch (err) {
    console.error("OBS CONNECTION ERROR:", err);

    return {
      sceneName: "Unknown Scene",
      sources: "Unknown Sources",
    };
  }
}