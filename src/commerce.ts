import links from './purchase-links.json';
const allowedStoreHosts = /(^|\.)((taobao|tmall)\.com)$/i;
const isiPhone = typeof navigator !== 'undefined' && /iPhone|iPod/i.test(navigator.userAgent);

function trustedStoreUrl(value: string | null | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || !allowedStoreHosts.test(url.hostname)) return null;
    // Taobao's iPhone share link uses the mobile detail page. Keep its full query, including SKU selection.
    if (isiPhone && url.hostname === 'item.taobao.com' && url.searchParams.get('id')) {
      url.hostname = 'h5.m.taobao.com';
      url.pathname = '/awp/core/detail.htm';
    }
    return url.toString();
  } catch {
    return null;
  }
}

/** Set these through deployment environment variables when the shop is ready. */
export const commerce = {
  shopUrl: trustedStoreUrl(import.meta.env.VITE_TAOBAO_SHOP_URL || links.shopUrl),
  featuredProductUrl: trustedStoreUrl(import.meta.env.VITE_TAOBAO_FEATURED_URL || links.products.jingxin),
};

export function productPurchaseUrl(slug: string, isFeatured: boolean) {
  const productLinks: Record<string, string | null> = links.products;
  return trustedStoreUrl(productLinks[slug]) || (isFeatured ? commerce.featuredProductUrl : null) || commerce.shopUrl;
}

export function accessoryPurchaseUrl(kind: 'eyes' | 'wigs' | 'clothing' | 'jewelry') {
  return trustedStoreUrl(links.accessories[kind]);
}

/** Let Safari handle a direct tap on a mobile Taobao link instead of forcing a new browser tab. */
export function installMobilePurchaseNavigation() {
  if (!isiPhone) return;
  document.addEventListener('click', (event) => {
    const target = event.target;
    const anchor = target instanceof Element ? target.closest<HTMLAnchorElement>('a[href]') : null;
    if (!anchor || anchor.hasAttribute('download')) return;
    try {
      const url = new URL(anchor.href);
      if (url.protocol === 'https:' && allowedStoreHosts.test(url.hostname)) anchor.target = '_self';
    } catch { /* Leave unrelated links alone. */ }
  }, true);
}
