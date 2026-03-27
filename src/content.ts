// ==========================================
// 网站全局内容与图片配置文件 (上线准备版)
// ==========================================
// 💡 上线终极指南 (动态图片排版说明)：
// 
// 1. 本网站的所有排版（网格、跑马灯、瀑布流）都已经是【完全动态】的！
// 2. 无论你在下面的数组中添加 3 张、5 张还是 100 张图片，页面都会自动计算并完美排版。
// 3. 如何添加图片：
//    - 将你的图片上传到 GitHub 仓库的 `images/...` 对应的文件夹中。
//    - 在下方的对应数组中，复制一行代码，修改 `id` 和 `src`（图片路径）即可。
//    - 想要几张就写几行，不需要修改任何组件代码！

export interface ImageItem {
  id: number | string;
  src: string;
  alt?: string;
  position?: string;
  objectFit?: "cover" | "contain";
}

export interface ProjectItem {
  id: number | string;
  title: string;
  description?: string;
  src: string;
  location?: string;
  year?: string;
  objectFit?: "cover" | "contain";
  galleryImages?: string[];
  concept?: string;
}

// 🌟 这里是您的 GitHub 图床基础链接！
// 使用 raw.githubusercontent.com 以确保图片更新能立即生效
const BASE_URL = "https://cdn.jsdelivr.net/gh/a58293/panl-d@main/images";

// ==========================================
// 1. 首页分类与封面 (Covers & Logo)
// ==========================================
const _homeCategories = [
  { id: "logo", label: "LOGO", labelCn: "客户集", src: `${BASE_URL}/covers/logo.webp`, className: "col-span-2 row-span-2", link: "/logos", objectFit: "contain" as const },
  { id: "bjd", label: "BJD", labelCn: "球关节人偶", src: `${BASE_URL}/covers/bjd.webp`, className: "col-span-1 row-span-1", href: "https://planabcf.netlify.app/", objectFit: "cover" as const },
  { id: "spatial", label: "SPATIAL", labelCn: "空间设计", src: `${BASE_URL}/covers/spatial.webp`, className: "col-span-1 row-span-1", link: "/spatial", objectFit: "cover" as const },
  { id: "installation", label: "PRODUCT DESIGN", labelCn: "产品设计", src: `${BASE_URL}/covers/installation.webp`, className: "col-span-1 row-span-1", link: "/installation", objectFit: "cover" as const },
  { id: "mcn", label: "MCN", labelCn: "模特经纪", src: `${BASE_URL}/covers/mcn.webp`, className: "col-span-1 row-span-1", link: "/mcn", objectFit: "cover" as const },
  { id: "graphic", label: "GRAPHIC", labelCn: "平面设计", src: `${BASE_URL}/covers/graphic.webp`, className: "col-span-2 row-span-1", link: "/graphic", objectFit: "cover" as const },
  { id: "illustration", label: "ILLUSTRATION", labelCn: "插画艺术", src: `${BASE_URL}/covers/illustration.webp`, className: "col-span-2 row-span-1", link: "/illustration", objectFit: "cover" as const },
];

export const homeCategories = _homeCategories;

// ==========================================
// 2. 平面设计 (Graphic Design)
// ==========================================
export interface ProjectItem {
  id: number | string;
  title: string;
  src: string;
  galleryImages?: string[];
  description?: string;
}

const _graphicProjects: ProjectItem[] = [
  { 
    id: 1, 
    title: "Project 01", 
    src: `${BASE_URL}/graphic/01.webp`,
    galleryImages: Array.from({ length: 3 }, (_, i) => `${BASE_URL}/graphic/01-${i + 1}.webp`)
  },
  { 
    id: 2, 
    title: "Project 02", 
    src: `${BASE_URL}/graphic/02.webp`,
    galleryImages: [`${BASE_URL}/graphic/02-1.webp`]
  },
  { 
    id: 3, 
    title: "Project 03", 
    src: `${BASE_URL}/graphic/03.webp`,
    galleryImages: []
  },
  { 
    id: 4, 
    title: "Project 04", 
    src: `${BASE_URL}/graphic/04.webp`,
    galleryImages: Array.from({ length: 4 }, (_, i) => `${BASE_URL}/graphic/04-${i + 1}.webp`)
  },
  { 
    id: 5, 
    title: "Project 05", 
    src: `${BASE_URL}/graphic/05.webp`,
    galleryImages: Array.from({ length: 5 }, (_, i) => `${BASE_URL}/graphic/05-${i + 1}.webp`)
  },
  { 
    id: 6, 
    title: "Project 06", 
    src: `${BASE_URL}/graphic/06.webp`,
    galleryImages: Array.from({ length: 5 }, (_, i) => `${BASE_URL}/graphic/06-${i + 1}.webp`)
  },
  { 
    id: 7, 
    title: "Project 07", 
    src: `${BASE_URL}/graphic/07.webp`,
    galleryImages: Array.from({ length: 3 }, (_, i) => `${BASE_URL}/graphic/07-${i + 1}.webp`)
  },
  { 
    id: 8, 
    title: "Project 08", 
    src: `${BASE_URL}/graphic/08.webp`,
    galleryImages: []
  },
  { 
    id: 9, 
    title: "Project 09", 
    src: `${BASE_URL}/graphic/09.webp`,
    galleryImages: Array.from({ length: 5 }, (_, i) => `${BASE_URL}/graphic/09-${i + 1}.webp`)
  },
  { 
    id: 10, 
    title: "Project 10", 
    src: `${BASE_URL}/graphic/10.webp`,
    galleryImages: []
  },
  { 
    id: 11, 
    title: "Project 11", 
    src: `${BASE_URL}/graphic/11.webp`,
    galleryImages: []
  },
  { 
    id: 12, 
    title: "Project 12", 
    src: `${BASE_URL}/graphic/12.webp`,
    galleryImages: []
  },
  { 
    id: 13, 
    title: "Project 13", 
    src: `${BASE_URL}/graphic/13.webp`,
    galleryImages: Array.from({ length: 6 }, (_, i) => `${BASE_URL}/graphic/13-${i + 1}.webp`)
  }
];

export const graphicProjects = _graphicProjects;
export const graphicImages = _graphicProjects; // Keep for compatibility if needed elsewhere temporarily

// ==========================================
// 2.5 品牌标识 (Logo Design)
// ==========================================
const _logoImages: ImageItem[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  src: `${BASE_URL}/logo/${String(i + 1).padStart(2, '0')}.webp`,
  alt: `Logo 设计 ${String(i + 1).padStart(2, '0')}`
}));

export const logoImages = _logoImages;

// ==========================================
// 3. 插画艺术 (Illustration)
// ==========================================
const _illustrationImages = Array.from({ length: 39 }, (_, i) => `${BASE_URL}/illustration/${String(i + 1).padStart(2, '0')}.webp`);

export const illustrationImages = _illustrationImages;

// ==========================================
// 4. 空间设计 (Spatial Design)
// ==========================================
const _spatialProjects: ProjectItem[] = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  title: `项目名称 ${String(i + 1).padStart(2, '0')}`,
  description: `这里是空间设计项目 ${String(i + 1).padStart(2, '0')} 的详细描述文案，介绍设计理念等。`,
  src: `${BASE_URL}/spatial/${String(i + 1).padStart(2, '0')}.webp`,
  location: "Shanghai, CN",
  year: "2024"
}));

export const spatialProjects = _spatialProjects;

// ==========================================
// 5. 产品设计 (Product Design)
// ==========================================
const _installationProjects: ProjectItem[] = [
  { id: 1, title: "阿祖的小院", src: `${BASE_URL}/installation/01.webp`, location: "丽江", year: "2026", galleryImages: [
    `${BASE_URL}/installation/01-1.webp`,
    `${BASE_URL}/installation/01-2.webp`,
    `${BASE_URL}/installation/01-4.webp`,
    `${BASE_URL}/installation/01-5.webp`,
    `${BASE_URL}/installation/01-6.webp`,
    `${BASE_URL}/installation/01-7.webp`,
  ] },
  { id: 3, title: "普洱茶", src: `${BASE_URL}/installation/03.webp`, location: "昆明", year: "2025", galleryImages: Array.from({ length: 11 }, (_, i) => `${BASE_URL}/installation/03-${i + 1}.webp`) },
  { id: 4, title: "岚·Bistro", src: `${BASE_URL}/installation/04.webp`, location: "丽江", year: "2025", galleryImages: [
    `${BASE_URL}/installation/04-2.webp`,
    `${BASE_URL}/installation/04-3.webp`,
  ] },
  { id: 5, title: "食谷者 X 华侨城恐龙谷", src: `${BASE_URL}/installation/05.webp`, location: "昆明", year: "2024", galleryImages: Array.from({ length: 4 }, (_, i) => `${BASE_URL}/installation/05-${i + 1}.webp`) },
  { id: 6, title: "茜姿兰", src: `${BASE_URL}/installation/06.webp`, location: "昆明", year: "2023", galleryImages: Array.from({ length: 10 }, (_, i) => `${BASE_URL}/installation/06-${i + 1}.webp`) },
  { id: 7, title: "普洱", src: `${BASE_URL}/installation/07.webp`, location: "昆明", year: "2023", galleryImages: Array.from({ length: 20 }, (_, i) => `${BASE_URL}/installation/07-${i + 1}.webp`) },
  { id: 8, title: "健康日记", src: `${BASE_URL}/installation/08.webp`, location: "昆明", year: "2023", galleryImages: Array.from({ length: 12 }, (_, i) => `${BASE_URL}/installation/08-${i + 1}.webp`) },
  { id: 9, title: "泽彝", src: `${BASE_URL}/installation/09.webp`, location: "楚雄", year: "2023", galleryImages: [
    ...Array.from({ length: 8 }, (_, i) => `${BASE_URL}/installation/09-${i + 1}.webp`),
    `${BASE_URL}/installation/09-9·.webp`,
    ...Array.from({ length: 3 }, (_, i) => `${BASE_URL}/installation/09-${i + 10}.webp`),
  ] },
  { id: 10, title: "南嵩", src: `${BASE_URL}/installation/10.webp`, location: "浙江", year: "2023", galleryImages: Array.from({ length: 4 }, (_, i) => `${BASE_URL}/installation/10-${i + 1}.webp`) },
  { id: 11, title: "鸢尾", src: `${BASE_URL}/installation/11.webp`, location: "丽江", year: "2023", galleryImages: Array.from({ length: 9 }, (_, i) => `${BASE_URL}/installation/11-${i + 1}.webp`) },
  { id: 12, title: "蓬松生活", src: `${BASE_URL}/installation/12.webp`, location: "武汉", year: "2022", galleryImages: [
    `${BASE_URL}/installation/12-1·.webp`,
    ...Array.from({ length: 4 }, (_, i) => `${BASE_URL}/installation/12-${i + 2}.webp`),
  ] },
  { id: 13, title: "云南省阜外心血管病医院", src: `${BASE_URL}/installation/13.webp`, location: "昆明", year: "2022", galleryImages: Array.from({ length: 4 }, (_, i) => `${BASE_URL}/installation/13-${i + 1}.webp`) },
  { id: 14, title: "孔子学院", src: `${BASE_URL}/installation/14.webp`, location: "曲阜", year: "2021", galleryImages: Array.from({ length: 11 }, (_, i) => `${BASE_URL}/installation/14-${i + 1}.webp`) },
  { id: 15, title: "naravan", src: `${BASE_URL}/installation/15.webp`, location: "Canada", year: "2024", galleryImages: Array.from({ length: 12 }, (_, i) => `${BASE_URL}/installation/15-${i + 1}.webp`) },
  { id: 16, title: "中环·卡地亚", src: `${BASE_URL}/installation/16.webp`, location: "香港", year: "2020", galleryImages: Array.from({ length: 5 }, (_, i) => `${BASE_URL}/installation/16-${i + 1}.webp`) },
  { id: 17, title: "十木草", src: `${BASE_URL}/installation/17.webp`, location: "昆明", year: "2019", galleryImages: Array.from({ length: 3 }, (_, i) => `${BASE_URL}/installation/17-${i + 1}.webp`) },
  { id: 18, title: "话说大理", src: `${BASE_URL}/installation/18.webp`, location: "大理", year: "2019", galleryImages: Array.from({ length: 6 }, (_, i) => `${BASE_URL}/installation/18-${i + 1}.webp`) },
  { id: 19, title: "CORAL CLUB", src: `${BASE_URL}/installation/19.webp`, location: "加拿大", year: "2019", galleryImages: Array.from({ length: 8 }, (_, i) => `${BASE_URL}/installation/19-${i + 1}.webp`) },
  { id: 20, title: "丹寨万达小镇", src: `${BASE_URL}/installation/20.webp`, location: "贵州", year: "2019", galleryImages: Array.from({ length: 3 }, (_, i) => `${BASE_URL}/installation/20-${i + 1}.webp`) },
  { id: 22, title: "槐山脚下", src: `${BASE_URL}/installation/22.webp`, location: "西安", year: "2018", galleryImages: Array.from({ length: 5 }, (_, i) => `${BASE_URL}/installation/22-${i + 1}.webp`) },
  { id: 23, title: "月咏堂", src: `${BASE_URL}/installation/23.webp`, location: "丽江", year: "2017", galleryImages: Array.from({ length: 3 }, (_, i) => `${BASE_URL}/installation/23-${i + 1}.webp`) },
  { id: 24, title: "应时发生", src: `${BASE_URL}/installation/24.webp`, location: "昆明", year: "2017", galleryImages: Array.from({ length: 8 }, (_, i) => `${BASE_URL}/installation/24-${i + 1}.webp`) },
  { id: 25, title: "RUNNING HAM", src: `${BASE_URL}/installation/25.webp`, location: "丽江", year: "2017", galleryImages: Array.from({ length: 8 }, (_, i) => `${BASE_URL}/installation/25-${i + 1}.webp`) },
];

export const installationProjects = _installationProjects;

// ==========================================
// 6. 模特经纪 (MCN)
// ==========================================
const _mcnModelAImages = [
  `${BASE_URL}/mcn/model-a-01.webp`,
  `${BASE_URL}/mcn/model-a-02.webp`,
  `${BASE_URL}/mcn/model-a-03.webp`,
  `${BASE_URL}/mcn/model-a-04.webp`,
  `${BASE_URL}/mcn/model-a-05.webp`,
  `${BASE_URL}/mcn/model-a-06.webp`,
  `${BASE_URL}/mcn/model-a-07.webp`,
  `${BASE_URL}/mcn/model-a-08.webp`,
  `${BASE_URL}/mcn/model-a-09.webp`,
  `${BASE_URL}/mcn/model-a-10.webp`,
  `${BASE_URL}/mcn/model-a-11.webp`,
  `${BASE_URL}/mcn/model-a-12.webp`,
  `${BASE_URL}/mcn/model-a-13.webp`,
  `${BASE_URL}/mcn/model-a-14.webp`,
];

export const mcnModelAImages = _mcnModelAImages;

const _mcnModelBImages = [
  `${BASE_URL}/mcn/model-b-01.webp`,
  `${BASE_URL}/mcn/model-b-02.webp`,
  `${BASE_URL}/mcn/model-b-03.webp`,
  `${BASE_URL}/mcn/model-b-04.webp`,
  `${BASE_URL}/mcn/model-b-05.webp`,
  `${BASE_URL}/mcn/model-b-06.webp`,
  `${BASE_URL}/mcn/model-b-07.webp`,
  `${BASE_URL}/mcn/model-b-08.webp`,
  `${BASE_URL}/mcn/model-b-09.webp`,
  `${BASE_URL}/mcn/model-b-10.webp`,
  `${BASE_URL}/mcn/model-b-11.webp`,
  `${BASE_URL}/mcn/model-b-12.webp`,
  `${BASE_URL}/mcn/model-b-13.webp`,
  `${BASE_URL}/mcn/model-b-14.webp`,
  `${BASE_URL}/mcn/model-b-15.webp`,
  `${BASE_URL}/mcn/model-b-16.webp`,
  `${BASE_URL}/mcn/model-b-17.webp`,
  `${BASE_URL}/mcn/model-b-18.webp`,
  `${BASE_URL}/mcn/model-b-19.webp`,
  `${BASE_URL}/mcn/model-b-20.webp`,
  `${BASE_URL}/mcn/model-b-21.webp`,
  `${BASE_URL}/mcn/model-b-22.webp`,
];

export const mcnModelBImages = _mcnModelBImages;

// ==========================================
// 7. 预加载优化 (Preload Optimization)
// ==========================================
const prefetchedPaths = new Set<string>();

export const prefetchSectionImages = (path: string) => {
  // 防止在非浏览器环境下执行或重复预加载
  if (typeof window === 'undefined' || prefetchedPaths.has(path)) return;
  
  prefetchedPaths.add(path);

  let imagesToPreload: string[] = [];
  switch (path) {
    case "/graphic":
      imagesToPreload = _graphicProjects.slice(0, 6).map(p => p.src);
      break;
    case "/logos":
      imagesToPreload = _logoImages.slice(0, 6).map(img => img.src);
      break;
    case "/illustration":
      imagesToPreload = _illustrationImages.slice(0, 6);
      break;
    case "/spatial":
      imagesToPreload = _spatialProjects.slice(0, 4).map(p => p.src);
      break;
    case "/installation":
      imagesToPreload = _installationProjects.slice(0, 4).map(p => p.src);
      break;
    case "/mcn":
      imagesToPreload = [
        ..._mcnModelAImages.slice(0, 3),
        ..._mcnModelBImages.slice(0, 3)
      ];
      break;
  }

  // 利用浏览器的 Image 对象在后台静默下载图片并存入缓存
  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};
