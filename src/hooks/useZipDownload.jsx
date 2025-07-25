// Custom hook to handle zip download of images
import { useCallback } from "react";
import JSZip from "jszip";
import { useSnackbar } from "notistack";

export default function useZipDownload() {
  const { enqueueSnackbar } = useSnackbar();

  const handleZipDownload = useCallback(
    async (images, product) => {
      const zip = new JSZip();

      try {
        // Fetch all images, add to zip
        await Promise.all(
          images.map(async (url, index) => {
            const response = await fetch(url, { credentials: "include" });
            if (!response.ok) throw new Error(`Failed to fetch ${url}`);
            const blob = await response.blob();
            zip.file(`${product}_${index}.png`, blob);
          })
        );

        // Generate the zip file as Blob
        const content = await zip.generateAsync({ type: "blob" });

        // Create a download link and trigger it
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = `gleem_${product}.zip`;
        document.body.appendChild(link);
        link.click();

        // Cleanup link element
        link.remove();
        URL.revokeObjectURL(link.href);
        enqueueSnackbar("Images downloaded successfully", {
          variant: "success",
        });
      } catch (error) {
        console.error("Error generating zip:", error);
        enqueueSnackbar("There was an error downloading the images.", {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar]
  );

  return handleZipDownload;
}
