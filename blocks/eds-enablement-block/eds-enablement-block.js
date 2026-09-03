import { createOptimizedPicture } from '../../scripts/aem.js';

function decorateImage(imageColumn) {
  const image = imageColumn.querySelector('img');
  if (!image) return;

  const picture = image.closest('picture');
  (picture || image).replaceWith(createOptimizedPicture(image.src, image.alt, false, [{ width: '750' }]));
}

export default function decorate(block) {
  const items = document.createElement('div');
  items.className = 'eds-enablement-block-items';

  [...block.children].forEach((row) => {
    const columns = [...row.children];
    if (!columns.length) return;

    const item = document.createElement('article');
    item.className = 'eds-enablement-block-item';
    const imageColumn = columns.find((column) => column.querySelector('picture, img'));

    if (imageColumn) {
      imageColumn.classList.add('eds-enablement-block-image');
      decorateImage(imageColumn);
      item.append(imageColumn);
    }

    const contentColumns = columns.filter((column) => column !== imageColumn);
    if (contentColumns.length) {
      const content = document.createElement('div');
      content.className = 'eds-enablement-block-content';
      content.append(...contentColumns);
      item.append(content);
    }

    items.append(item);
  });

  if (items.children.length) block.replaceChildren(items);
}
