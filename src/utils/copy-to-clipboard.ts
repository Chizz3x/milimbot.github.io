const copyToClipboard = (data: string) => {
  navigator.clipboard.writeText(data);
};

export { copyToClipboard };