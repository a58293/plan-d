import type {CSSProperties} from 'react';
import { JINGXIN_PATH } from './flower-gods-catalog';

/** 首页当期主推：名称、直达地址和两种展示素材集中配置，图片沿用素材库引用。 */
export const currentFeaturedProduct = {
  name: '镜昕',
  flower: '荷花女神',
  href: JINGXIN_PATH,
  physicalMedia: 'jingxinPortrait',
  conceptMedia: 'jingxinConcept',
} as const;

/** 当期首页主题：换期时在这里整体更新主色及其明暗色阶，不影响角色详情的独立配色。 */
export const currentProductTheme = {
  product: 'jingxin',
  name: '镜昕 · 天水碧',
  colors: {
    main: '#8bbcaf',
    deep: '#092e28',
    ink: '#123f36',
    middle: '#215d50',
    accent: '#277160',
    muted: '#3c6157',
    paper: '#f0f6f2',
    mist: '#e0ede6',
    soft: '#c3ded3',
    light: '#edf6f0',
  },
} as const;

export const currentProductThemeStyle = Object.fromEntries(
  Object.entries(currentProductTheme.colors).map(([role, color]) => [`--current-${role}`, color]),
) as CSSProperties;

/** 色彩归属：通用页面随当期 UP；角色本人及其眼球、假发、衣装、饰物等专属内容始终使用角色主色。 */
export const characterThemes = {
  jingxin: {
    name: '镜昕 · 天水碧',
    ink: '#173b34',
    deep: '#123f36',
    accent: '#277160',
    muted: '#64756d',
    light: '#edf6f0',
  },
} as const;

export function characterThemeStyle(owner: keyof typeof characterThemes): CSSProperties {
  return Object.fromEntries(
    Object.entries(characterThemes[owner]).filter(([role]) => role !== 'name').map(([role, color]) => [`--owner-${role}`, color]),
  ) as CSSProperties;
}
