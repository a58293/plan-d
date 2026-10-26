const buttonLikeLinks = [
  'a[class*="button"]', 'a[class*="btn"]', 'a[class*="action"]',
  'a[class*="entry"]', 'a[class*="primary"]', 'a[class*="buy"]',
  'a[class*="shop"]', 'a[class*="trigger"]', 'a[role="button"]',
  '.report-actions a', '.accessory-actions-primary a', '.accessory-actions-secondary a',
  '.accessory-archive-buy', '.accessory-lotus-copy > a', '.flower-collection-back',
  '.flower-character-enter', '.prologue-verify', '.verification-copy > a',
].join(',');
const candidate = `button,${buttonLikeLinks}`;

function enhance(root: ParentNode) {
  const elements = [root instanceof HTMLElement && root.matches(candidate) ? root : null, ...root.querySelectorAll<HTMLElement>(candidate)];
  elements.forEach((element) => {
    if (!element) return;
    if (element.closest('.desktop-navigation,.story-edge,.mobile-navigation') || element.matches('.home-verify-primary')) return;
    if (element.matches('a[href]') && (element.querySelector('img,picture,video,figure,article') || !element.textContent?.trim())) return;
    element.classList.add('lumen-action');
  });
}

export function installLuminousActions() {
  enhance(document);
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches(candidate)) enhance(node.parentElement ?? document);
        else enhance(node);
      }
    }
  });
  observer.observe(document.body, {childList:true,subtree:true});
}



