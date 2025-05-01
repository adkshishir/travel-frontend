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
    let ul = h3.nextElementSibling;

    // Skip over any non-ul elements if present
    while (ul && ul.tagName.toLowerCase() !== 'ul') {
      ul = ul.nextElementSibling;
    }

    const items: string[] = [];
    if (ul) {
      const lis = ul.querySelectorAll('li');
      lis.forEach((li) => {
        const text = li.textContent?.trim();
        if (text && text !== '') {
          items.push(text);
        }
      });
    }

    sections.push({ subtitle, items });
  });

  return { title, sections };
}
