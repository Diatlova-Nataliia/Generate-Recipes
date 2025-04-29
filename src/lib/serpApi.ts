const apiKey = process.env.NEXT_PUBLIC_SERPAPI_API_KEY;

export async function getImages(name: string): Promise<string> {
  const response = await fetch(
    `https://serpapi.com/search?api_key=${apiKey}&q=${name}&engine=google_images&ijn=0`,
  );
  const results = await response.json();
  return results.images_results[0].original ?? "";
}
