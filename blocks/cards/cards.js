import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);

  // Add hover effect to card list items
  const cardLists = block.querySelectorAll('ul li');
  cardLists.forEach(item => {
    item.addEventListener('mouseover', function() {
      this.style.transform = 'scale(1.05)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseout', function() {
      this.style.transform = 'scale(1)';
    });
  });
}
