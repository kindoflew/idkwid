export function formatDate(postDate) {
  const date = new Date(postDate);
  
  const options = {
    month: "short",
    day: "numeric",
  };
  if (date.year < new Date().year) {
    options.year = "numeric";
  }

  return date.toLocaleString(undefined, options);
}