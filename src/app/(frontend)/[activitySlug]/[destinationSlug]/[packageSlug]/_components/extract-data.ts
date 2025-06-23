type Section = {
  subtitle: string;
  items: string[];
};

type ExtractedData = {
  title: string;
  sections: Section[];
};

export function extractDataFromHTML(html: string): ExtractedData {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const h2 = doc.querySelector('h2');
  const title = h2?.textContent?.trim() || '';

  const sections: Section[] = [];

  const h3Elements = doc.querySelectorAll('h3');
  h3Elements.forEach((h3) => {
    const subtitle = h3.textContent?.trim() || '';
    let nextElement = h3.nextElementSibling;

    const items: string[] = [];

    // Check for <p> and <ul> tags after <h3>
    while (nextElement && nextElement.tagName.toLowerCase() !== 'h3') {
      if (nextElement.tagName.toLowerCase() === 'p') {
        const text = nextElement.textContent?.trim();
        if (text && text !== '') {
          items.push(text); // Add <p> content to items
        }
      } else if (nextElement.tagName.toLowerCase() === 'ul') {
        const lis = nextElement.querySelectorAll('li');
        lis.forEach((li) => {
          const text = li.textContent?.trim();
          if (text && text !== '') {
            items.push(text); // Add <li> content to items
          }
        });
        break; // Stop after processing the <ul>
      }
      nextElement = nextElement.nextElementSibling;
    }

    sections.push({ subtitle, items }); // Keep description empty if not needed
  });

  return { title, sections };
}
