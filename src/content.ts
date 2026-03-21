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
// 使用 jsDelivr 全球加速 CDN，在中国大陆访问速度极快，是最稳定的 GitHub 图床方案
const BASE_URL = "https://cdn.jsdelivr.net/gh/a58293/panl-d@main/images";

// ==========================================
// 1. 首页分类与封面 (Covers & Logo)
// ==========================================
const _homeCategories = [
  { id: "logo", label: "LOGO", labelCn: "品牌标识", src: `${BASE_URL}/covers/logo.webp`, className: "col-span-2 row-span-2", objectFit: "contain" as const },
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
const _graphicImages: ImageItem[] = [
  { id: 1, src: `${BASE_URL}/graphic/01.webp`, alt: "平面设计 01" },
  { id: 2, src: `${BASE_URL}/graphic/02.webp`, alt: "平面设计 02" },
  { id: 3, src: `${BASE_URL}/graphic/03.webp`, alt: "平面设计 03" },
  { id: 4, src: `${BASE_URL}/graphic/04.webp`, alt: "平面设计 04" },
  { id: 5, src: `${BASE_URL}/graphic/05.webp`, alt: "平面设计 05" },
  { id: 6, src: `${BASE_URL}/graphic/06.webp`, alt: "平面设计 06" },
  { id: 7, src: `${BASE_URL}/graphic/07.webp`, alt: "平面设计 07" },
  { id: 8, src: `${BASE_URL}/graphic/08.webp`, alt: "平面设计 08" },
  { id: 9, src: `${BASE_URL}/graphic/09.webp`, alt: "平面设计 09" },
  { id: 10, src: `${BASE_URL}/graphic/10.webp`, alt: "平面设计 10" },
  { id: 11, src: `${BASE_URL}/graphic/11.webp`, alt: "平面设计 11" },
  { id: 12, src: `${BASE_URL}/graphic/12.webp`, alt: "平面设计 12" },
  { id: 13, src: `${BASE_URL}/graphic/13.webp`, alt: "平面设计 13" },
  { id: 14, src: `${BASE_URL}/graphic/14.webp`, alt: "平面设计 14" },
  { id: 15, src: `${BASE_URL}/graphic/15.webp`, alt: "平面设计 15" },
  { id: 16, src: `${BASE_URL}/graphic/16.webp`, alt: "平面设计 16" },
  { id: 17, src: `${BASE_URL}/graphic/17.webp`, alt: "平面设计 17" },
  { id: 18, src: `${BASE_URL}/graphic/18.webp`, alt: "平面设计 18" },
  { id: 19, src: `${BASE_URL}/graphic/19.webp`, alt: "平面设计 19" },
  { id: 20, src: `${BASE_URL}/graphic/20.webp`, alt: "平面设计 20" },
  { id: 21, src: `${BASE_URL}/graphic/21.webp`, alt: "平面设计 21" },
  { id: 22, src: `${BASE_URL}/graphic/22.webp`, alt: "平面设计 22" },
  { id: 23, src: `${BASE_URL}/graphic/23.webp`, alt: "平面设计 23" },
  { id: 24, src: `${BASE_URL}/graphic/24.webp`, alt: "平面设计 24" },
  { id: 25, src: `${BASE_URL}/graphic/25.webp`, alt: "平面设计 25" },
  { id: 26, src: `${BASE_URL}/graphic/26.webp`, alt: "平面设计 26" },
  { id: 27, src: `${BASE_URL}/graphic/27.webp`, alt: "平面设计 27" },
  { id: 28, src: `${BASE_URL}/graphic/28.webp`, alt: "平面设计 28" },
  { id: 29, src: `${BASE_URL}/graphic/29.webp`, alt: "平面设计 29" },
  { id: 30, src: `${BASE_URL}/graphic/30.webp`, alt: "平面设计 30" },
];

export const graphicImages = _graphicImages;

// ==========================================
// 3. 插画艺术 (Illustration)
// ==========================================
const _illustrationImages = [
  `${BASE_URL}/illustration/01.webp`,
  `${BASE_URL}/illustration/02.webp`,
  `${BASE_URL}/illustration/03.webp`,
  `${BASE_URL}/illustration/04.webp`,
  `${BASE_URL}/illustration/05.webp`,
  `${BASE_URL}/illustration/06.webp`,
  `${BASE_URL}/illustration/07.webp`,
  `${BASE_URL}/illustration/08.webp`,
  `${BASE_URL}/illustration/09.webp`,
  `${BASE_URL}/illustration/10.webp`,
  `${BASE_URL}/illustration/11.webp`,
  `${BASE_URL}/illustration/12.webp`,
  `${BASE_URL}/illustration/13.webp`,
  `${BASE_URL}/illustration/14.webp`,
  `${BASE_URL}/illustration/15.webp`,
  `${BASE_URL}/illustration/16.webp`,
  `${BASE_URL}/illustration/17.webp`,
  `${BASE_URL}/illustration/18.webp`,
  `${BASE_URL}/illustration/19.webp`,
  `${BASE_URL}/illustration/20.webp`,
  `${BASE_URL}/illustration/21.webp`,
  `${BASE_URL}/illustration/22.webp`,
  `${BASE_URL}/illustration/23.webp`,
  `${BASE_URL}/illustration/24.webp`,
  `${BASE_URL}/illustration/25.webp`,
  `${BASE_URL}/illustration/26.webp`,
  `${BASE_URL}/illustration/27.webp`,
  `${BASE_URL}/illustration/28.webp`,
  `${BASE_URL}/illustration/29.webp`,
  `${BASE_URL}/illustration/30.webp`,
  `${BASE_URL}/illustration/31.webp`,
  `${BASE_URL}/illustration/32.webp`,
  `${BASE_URL}/illustration/33.webp`,
  `${BASE_URL}/illustration/34.webp`,
  `${BASE_URL}/illustration/35.webp`,
  `${BASE_URL}/illustration/36.webp`,
  `${BASE_URL}/illustration/37.webp`,
  `${BASE_URL}/illustration/38.webp`,
  `${BASE_URL}/illustration/39.webp`,
];

export const illustrationImages = _illustrationImages;

// ==========================================
// 4. 空间设计 (Spatial Design)
// ==========================================
const _spatialProjects: ProjectItem[] = [
  { id: 1, title: "项目名称 01", description: "这里是空间设计项目 01 的详细描述文案，介绍设计理念等。", src: `${BASE_URL}/spatial/01.webp`, location: "Shanghai, CN", year: "2024" },
  { id: 2, title: "项目名称 02", description: "这里是空间设计项目 02 的详细描述文案，介绍设计理念等。", src: `${BASE_URL}/spatial/02.webp`, location: "Shanghai, CN", year: "2024" },
  { id: 3, title: "项目名称 03", description: "这里是空间设计项目 03 的详细描述文案，介绍设计理念等。", src: `${BASE_URL}/spatial/03.webp`, location: "Shanghai, CN", year: "2024" },
  { id: 4, title: "项目名称 04", description: "这里是空间设计项目 04 的详细描述文案，介绍设计理念等。", src: `${BASE_URL}/spatial/04.webp`, location: "Shanghai, CN", year: "2024" },
  { id: 5, title: "项目名称 05", description: "这里是空间设计项目 05 的详细描述文案，介绍设计理念等。", src: `${BASE_URL}/spatial/05.webp`, location: "Shanghai, CN", year: "2024" },
  { id: 6, title: "项目名称 06", description: "这里是空间设计项目 06 的详细描述文案，介绍设计理念等。", src: `${BASE_URL}/spatial/06.webp`, location: "Shanghai, CN", year: "2024" },
  { id: 7, title: "项目名称 07", description: "这里是空间设计项目 07 的详细描述文案，介绍设计理念等。", src: `${BASE_URL}/spatial/07.webp`, location: "Shanghai, CN", year: "2024" },
  { id: 8, title: "项目名称 08", description: "这里是空间设计项目 08 的详细描述文案，介绍设计理念等。", src: `${BASE_URL}/spatial/08.webp`, location: "Shanghai, CN", year: "2024" },
  { id: 9, title: "项目名称 09", description: "这里是空间设计项目 09 的详细描述文案，介绍设计理念等。", src: `${BASE_URL}/spatial/09.webp`, location: "Shanghai, CN", year: "2024" },
  { id: 10, title: "项目名称 10", description: "这里是空间设计项目 10 的详细描述文案，介绍设计理念等。", src: `${BASE_URL}/spatial/10.webp`, location: "Shanghai, CN", year: "2024" },
  { id: 11, title: "项目名称 11", description: "这里是空间设计项目 11 的详细描述文案，介绍设计理念等。", src: `${BASE_URL}/spatial/11.webp`, location: "Shanghai, CN", year: "2024" },
  { id: 12, title: "项目名称 12", description: "这里是空间设计项目 12 的详细描述文案，介绍设计理念等。", src: `${BASE_URL}/spatial/12.webp`, location: "Shanghai, CN", year: "2024" },
  { id: 13, title: "项目名称 13", description: "这里是空间设计项目 13 的详细描述文案，介绍设计理念等。", src: `${BASE_URL}/spatial/13.webp`, location: "Shanghai, CN", year: "2024" },
  { id: 14, title: "项目名称 14", description: "这里是空间设计项目 14 的详细描述文案，介绍设计理念等。", src: `${BASE_URL}/spatial/14.webp`, location: "Shanghai, CN", year: "2024" },
];

export const spatialProjects = _spatialProjects;

// ==========================================
// 5. 产品设计 (Product Design)
// ==========================================
const _installationProjects: ProjectItem[] = [
  { id: 1, title: "阿祖的小院", src: `${BASE_URL}/installation/01.webp`, location: "丽江", year: "2026", galleryImages: Array.from({ length: 10 }, (_, i) => `${BASE_URL}/installation/01-${i + 1}.webp`) },
  { id: 2, title: "昆明国际咖啡展", src: `${BASE_URL}/installation/02.webp`, location: "昆明", year: "2025", galleryImages: Array.from({ length: 4 }, (_, i) => `${BASE_URL}/installation/02-${i + 1}.webp`) },
  { id: 3, title: "普洱茶", src: `${BASE_URL}/installation/03.webp`, location: "昆明", year: "2025", galleryImages: Array.from({ length: 4 }, (_, i) => `${BASE_URL}/installation/03-${i + 1}.webp`) },
  { id: 4, title: "岚·Bistro", src: `${BASE_URL}/installation/04.webp`, location: "丽江", year: "2025", galleryImages: Array.from({ length: 4 }, (_, i) => `${BASE_URL}/installation/04-${i + 1}.webp`) },
  { id: 5, title: "食谷者 X 华侨城恐龙谷", src: `${BASE_URL}/installation/05.webp`, location: "昆明", year: "2024", galleryImages: Array.from({ length: 4 }, (_, i) => `${BASE_URL}/installation/05-${i + 1}.webp`) },
  { id: 6, title: "茜姿兰", src: `${BASE_URL}/installation/06.webp`, location: "昆明", year: "2023", galleryImages: Array.from({ length: 10 }, (_, i) => `${BASE_URL}/installation/06-${i + 1}.webp`) },
  { id: 7, title: "普洱", src: `${BASE_URL}/installation/07.webp`, location: "昆明", year: "2023", galleryImages: Array.from({ length: 20 }, (_, i) => `${BASE_URL}/installation/07-${i + 1}.webp`) },
  { id: 8, title: "健康日记", src: `${BASE_URL}/installation/08.webp`, location: "昆明", year: "2023", galleryImages: Array.from({ length: 12 }, (_, i) => `${BASE_URL}/installation/08-${i + 1}.webp`) },
  { id: 9, title: "泽彝", src: `${BASE_URL}/installation/09.webp`, location: "楚雄", year: "2023", galleryImages: Array.from({ length: 12 }, (_, i) => `${BASE_URL}/installation/09-${i + 1}.webp`) },
  { id: 10, title: "南嵩", src: `${BASE_URL}/installation/10.webp`, location: "浙江", year: "2023", galleryImages: Array.from({ length: 4 }, (_, i) => `${BASE_URL}/installation/10-${i + 1}.webp`) },
  { id: 11, title: "鸢尾", src: `${BASE_URL}/installation/11.webp`, location: "丽江", year: "2023", galleryImages: Array.from({ length: 9 }, (_, i) => `${BASE_URL}/installation/11-${i + 1}.webp`) },
  { id: 12, title: "蓬松生活", src: `${BASE_URL}/installation/12.webp`, location: "武汉", year: "2022", galleryImages: Array.from({ length: 5 }, (_, i) => `${BASE_URL}/installation/12-${i + 1}.webp`) },
  { id: 13, title: "云南省阜外心血管病医院", src: `${BASE_URL}/installation/13.webp`, location: "昆明", year: "2022", galleryImages: Array.from({ length: 4 }, (_, i) => `${BASE_URL}/installation/13-${i + 1}.webp`) },
  { id: 14, title: "孔子学院", src: `${BASE_URL}/installation/14.webp`, location: "曲阜", year: "2021", galleryImages: Array.from({ length: 11 }, (_, i) => `${BASE_URL}/installation/14-${i + 1}.webp`) },
  { id: 15, title: "naravan", src: `${BASE_URL}/installation/15.webp`, location: "墨西哥", year: "2020", galleryImages: Array.from({ length: 12 }, (_, i) => `${BASE_URL}/installation/15-${i + 1}.webp`) },
  { id: 16, title: "中环·卡地亚", src: `${BASE_URL}/installation/16.webp`, location: "香港", year: "2020", galleryImages: Array.from({ length: 5 }, (_, i) => `${BASE_URL}/installation/16-${i + 1}.webp`) },
  { id: 17, title: "十木草", src: `${BASE_URL}/installation/17.webp`, location: "大理", year: "2019", galleryImages: Array.from({ length: 8 }, (_, i) => `${BASE_URL}/installation/17-${i + 1}.webp`) },
  { id: 18, title: "话说大理", src: `${BASE_URL}/installation/18.webp`, location: "大理", year: "2019", galleryImages: Array.from({ length: 8 }, (_, i) => `${BASE_URL}/installation/18-${i + 1}.webp`) },
  { id: 19, title: "CORAL CLUB", src: `${BASE_URL}/installation/19.webp`, location: "加拿大", year: "2019", galleryImages: Array.from({ length: 8 }, (_, i) => `${BASE_URL}/installation/19-${i + 1}.webp`) },
  { id: 20, title: "丹寨万达小镇", src: `${BASE_URL}/installation/20.webp`, location: "西安", year: "2019", galleryImages: Array.from({ length: 3 }, (_, i) => `${BASE_URL}/installation/20-${i + 1}.webp`) },
  { id: 21, title: "竹屿青山", src: `${BASE_URL}/installation/21.webp`, location: "丽江", year: "2018", galleryImages: Array.from({ length: 1 }, (_, i) => `${BASE_URL}/installation/21-${i + 1}.webp`) },
  { id: 22, title: "槐山脚下", src: `${BASE_URL}/installation/22.webp`, location: "西安", year: "2018", galleryImages: Array.from({ length: 5 }, (_, i) => `${BASE_URL}/installation/22-${i + 1}.webp`) },
  { id: 23, title: "月咏堂", src: `${BASE_URL}/installation/23.webp`, location: "丽江", year: "2017", galleryImages: Array.from({ length: 5 }, (_, i) => `${BASE_URL}/installation/23-${i + 1}.webp`) },
  { id: 24, title: "应時發生", src: `${BASE_URL}/installation/24.webp`, location: "昆明", year: "2017", galleryImages: Array.from({ length: 8 }, (_, i) => `${BASE_URL}/installation/24-${i + 1}.webp`) },
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
