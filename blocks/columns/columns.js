export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      // Check for an existing EDS image
      const picture = col.querySelector('picture');

      if (picture) {
        const picWrapper = picture.closest('div');

        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-img-col');
        }

        return;
      }

      // Check for an image URL entered as plain text
      const text = col.textContent.trim();

      const imageUrlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;

      if (imageUrlPattern.test(text)) {
        const img = document.createElement('img');
        img.src = text;
        img.alt = 'Column image';
        img.loading = 'lazy';

        col.textContent = '';
        col.append(img);
        col.classList.add('columns-img-col');
      }
    });
  });
}
