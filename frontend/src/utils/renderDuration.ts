const renderDuration = (duration: number | null): string => {
  if (!duration) return "-";
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;

  return `${hours || ""}${hours ? " hr " : ""}${minutes || ""}${
    minutes ? " min" : ""
  }`;
};

export { renderDuration };
