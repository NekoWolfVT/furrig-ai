"use client";

import { useRive } from "@rive-app/react-canvas";

export default function RiggyRive() {
  const { RiveComponent } = useRive({
    src: "/riggy/default.riv",
    autoplay: true,
  });

  return (
    <div className="h-[400px] w-[400px]">
      <RiveComponent />
    </div>
  );
}