export function formatDate(postDate) {
  const date = new Date(postDate);
  
  const options = {
    month: "short",
    day: "numeric",
  };

  let postYear = date.getFullYear();
  let thisYear = new Date().getFullYear(); 
  if (postYear < thisYear) {
    options.year = "numeric";
  }

  return date.toLocaleString(undefined, options);
}