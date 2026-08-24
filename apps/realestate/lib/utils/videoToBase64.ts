interface IOptions {
  second?: number;
}

const videoToBase64 = async (
  url: string,
  options?: IOptions
): Promise<string> => {
  const { second = 1 } = options || {};

  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = url;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.preload = "auto";
    video.playsInline = true;

    const handleSeeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject("Cannot get canvas context");
        return;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const result = canvas.toDataURL("image/jpeg");
      cleanup();
      resolve(result);
    };

    const handleMetadataLoaded = () => {
      if (second > video.duration) {
        cleanup();
        reject("Selected time exceeds the video duration");
        return;
      }

      video.currentTime = second;
    };

    const handleError = () => {
      cleanup();
      reject("Error! Video cannot be loaded");
    };

    const cleanup = () => {
      video.removeEventListener("loadedmetadata", handleMetadataLoaded);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("error", handleError);
    };

    video.addEventListener("loadedmetadata", handleMetadataLoaded);
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("error", handleError);

    video.load();
  });
};

export default videoToBase64;
