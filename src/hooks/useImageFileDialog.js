import { useRef, useCallback, useState } from "react";

export function useImageFileDialog(maxFiles = 9) {
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  const openFileDialog = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = ""; // Reset so selecting same file again works
      inputRef.current.click();
    }
  }, []);

  const onChange = useCallback(
    (e) => {
      const selectedFiles = Array.from(e.target.files).filter(
        (file) => file.type === "image/jpeg" || file.type === "image/png"
      );
      // Combine existing files with newly selected files, up to maxFiles
      const combinedFiles = [...files, ...selectedFiles].slice(0, maxFiles);
      setFiles(combinedFiles);
    },
    [files, maxFiles]
  );

  // Hidden input element
  const FileInput = (
    <input
      ref={inputRef}
      type="file"
      accept="image/jpeg,image/png"
      multiple
      style={{ display: "none" }}
      onChange={onChange}
      data-testid="file-input"
    />
  );

  return { files, openFileDialog, FileInput, setFiles };
}
