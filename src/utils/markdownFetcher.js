// utils/markdownFetcher.js
export async function fetchMarkdown(fileName) {
    const response = await fetch(`/markdowns/${fileName}.md`);
    if (!response.ok) {
      throw new Error('Failed to fetch markdown');
    }
    return response.text();
  }
  