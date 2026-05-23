import { useEffect, useState } from "react";
import { resolveProjectImageSrc } from "@/utils/resolveProjectImageSrc";

export function useProjectImage(
  imageUrl: string | undefined,
  projectId: string,
) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [projectId, imageUrl]);

  const src = resolveProjectImageSrc(imageUrl);
  const showImage = Boolean(src) && !imageFailed;

  return {
    src,
    showImage,
    onError: () => setImageFailed(true),
  };
}
