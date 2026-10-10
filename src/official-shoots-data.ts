export type OfficialShoot = {
  slug: string;
  name: string;
  identity: string;
  series: string;
  storyTitle?: string;
  experienceHref: string;
  characterHref: string;
};

// One entry is one character's own scroll story. Future shoots can replace the
// preview images in that character's editor project without changing this index.
export const officialShoots: OfficialShoot[] = [
  {
    slug: 'jingxin',
    name: '镜昕',
    identity: '荷花女神',
    series: '花神卷',
    storyTitle: '泥沼生花，水月照心',
    experienceHref: '/story-experiences/jingxin.html',
    characterHref: '/series/flower-gods/jingxin',
  },
];
