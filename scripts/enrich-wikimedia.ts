export async function enrichFromWikimedia(fileTitle: string) {
  const api = "https://commons.wikimedia.org/w/api.php";
  const params = new URLSearchParams({
    action: "query",
    prop: "imageinfo",
    iiprop: "extmetadata|url",
    format: "json",
    titles: fileTitle
  });
  const res = await fetch(`${api}?${params}`);
  if (!res.ok) throw new Error("Wikimedia API error");
  const data = await res.json();
  return data;
}
