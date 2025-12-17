export const useClipboard = () => {
  const copyToClipboard = async (text: string, successMessage: string = "Copied to clipboard!") => {
    try {
      await navigator.clipboard.writeText(text);
      alert(successMessage); // replaced toast.success
    } catch (error) {
      alert("Failed to copy!"); // replaced toast.error
      console.error("Clipboard copy error:", error);
    }
  };

  return copyToClipboard;
};
