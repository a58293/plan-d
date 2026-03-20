// ==========================================
// 网站全局内容与图片配置文件 (上线准备版)
// ==========================================
// 💡 上线终极指南 (动态图片排版说明)：
// 
// 1. 本网站的所有排版（网格、跑马灯、瀑布流）都已经是【完全动态】的！
// 2. 无论你在下面的数组中添加 3 张、5 张还是 100 张图片，页面都会自动计算并完美排版。
// 3. 如何添加图片：
//    - 将你的图片上传到 `public/images/...` 对应的文件夹中。
//    - 在下方的对应数组中，复制一行代码，修改 `id` 和 `src`（图片路径）即可。
//    - 想要几张就写几行，不需要修改任何组件代码！
// 
// ⚠️ 注意：在你上传图片之前，现在的网页预览中图片会显示为“破损”或空白，这是正常的！上传后就会恢复。

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

// ==========================================
// 1. 首页分类与封面 (Covers & Logo)
// 请将图片上传到: public/images/covers/
// ==========================================
export const homeCategories = [
  { id: "logo", label: "LOGO", labelCn: "品牌标识", src: "/images/covers/logo.jpg", className: "col-span-2 row-span-2", objectFit: "contain" as const },
  { id: "bjd", label: "BJD", labelCn: "球关节人偶", src: "/images/covers/bjd.jpg", className: "col-span-1 row-span-1", href: "https://planabcf.netlify.app/", objectFit: "cover" as const },
  { id: "spatial", label: "SPATIAL", labelCn: "空间设计", src: "/images/covers/spatial.jpg", className: "col-span-1 row-span-1", link: "/spatial", objectFit: "cover" as const },
  { id: "installation", label: "PRODUCT DESIGN", labelCn: "产品设计", src: "/images/covers/installation.jpg", className: "col-span-1 row-span-1", link: "/installation", objectFit: "cover" as const },
  { id: "mcn", label: "MCN", labelCn: "模特经纪", src: "/images/covers/mcn.jpg", className: "col-span-1 row-span-1", link: "/mcn", objectFit: "cover" as const },
  { id: "graphic", label: "GRAPHIC", labelCn: "平面设计", src: "/images/covers/graphic.jpg", className: "col-span-2 row-span-1", link: "/graphic", objectFit: "cover" as const },
  { id: "illustration", label: "ILLUSTRATION", labelCn: "插画艺术", src: "/images/covers/illustration.jpg", className: "col-span-2 row-span-1", link: "/illustration", objectFit: "cover" as const },
];

// ==========================================
// 2. 平面设计 (Graphic Design)
// 请将图片上传到: public/images/graphic/
// 💡 动态排版：直接在数组中添加或删除对象，网格会自动适应数量。
// ==========================================
export const graphicImages: ImageItem[] = [
  { id: 1, src: "/images/graphic/01.jpg", alt: "平面设计 01" },
  { id: 2, src: "/images/graphic/02.jpg", alt: "平面设计 02" },
  { id: 3, src: "/images/graphic/03.jpg", alt: "平面设计 03" },
  { id: 4, src: "/images/graphic/04.jpg", alt: "平面设计 04" },
  { id: 5, src: "/images/graphic/05.jpg", alt: "平面设计 05" },
  { id: 6, src: "/images/graphic/06.jpg", alt: "平面设计 06" },
  { id: 7, src: "/images/graphic/07.jpg", alt: "平面设计 07" },
  { id: 8, src: "/images/graphic/08.jpg", alt: "平面设计 08" },
  { id: 9, src: "/images/graphic/09.jpg", alt: "平面设计 09" },
  { id: 10, src: "/images/graphic/10.jpg", alt: "平面设计 10" },
  { id: 11, src: "/images/graphic/11.jpg", alt: "平面设计 11" },
  { id: 12, src: "/images/graphic/12.jpg", alt: "平面设计 12" },
  { id: 13, src: "/images/graphic/13.jpg", alt: "平面设计 13" },
  { id: 14, src: "/images/graphic/14.jpg", alt: "平面设计 14" },
  { id: 15, src: "/images/graphic/15.jpg", alt: "平面设计 15" },
  { id: 16, src: "/images/graphic/16.jpg", alt: "平面设计 16" },
  { id: 17, src: "/images/graphic/17.jpg", alt: "平面设计 17" },
  { id: 18, src: "/images/graphic/18.jpg", alt: "平面设计 18" },
  { id: 19, src: "/images/graphic/19.jpg", alt: "平面设计 19" },
  { id: 20, src: "/images/graphic/20.jpg", alt: "平面设计 20" },
  { id: 21, src: "/images/graphic/21.jpg", alt: "平面设计 21" },
  { id: 22, src: "/images/graphic/22.jpg", alt: "平面设计 22" },
  { id: 23, src: "/images/graphic/23.jpg", alt: "平面设计 23" },
  { id: 24, src: "/images/graphic/24.jpg", alt: "平面设计 24" },
  { id: 25, src: "/images/graphic/25.jpg", alt: "平面设计 25" },
  { id: 26, src: "/images/graphic/26.jpg", alt: "平面设计 26" },
  { id: 27, src: "/images/graphic/27.jpg", alt: "平面设计 27" },
  { id: 28, src: "/images/graphic/28.jpg", alt: "平面设计 28" },
  { id: 29, src: "/images/graphic/29.jpg", alt: "平面设计 29" },
  { id: 30, src: "/images/graphic/30.jpg", alt: "平面设计 30" },
];

// ==========================================
// 3. 插画艺术 (Illustration) - 跑马灯展示
// 请将图片上传到: public/images/illustration/
// 💡 动态排版：直接在数组中添加或删除字符串，跑马灯会自动计算循环次数。
// ==========================================
export const illustrationImages = [
  "/images/illustration/01.jpg",
  "/images/illustration/02.jpg",
  "/images/illustration/03.jpg",
  "/images/illustration/04.jpg",
  "/images/illustration/05.jpg",
  "/images/illustration/06.jpg",
  "/images/illustration/07.jpg",
  "/images/illustration/08.jpg",
  "/images/illustration/09.jpg",
  "/images/illustration/10.jpg",
  "/images/illustration/11.jpg",
  "/images/illustration/12.jpg",
  "/images/illustration/13.jpg",
  "/images/illustration/14.jpg",
  "/images/illustration/15.jpg",
  "/images/illustration/16.jpg",
  "/images/illustration/17.jpg",
  "/images/illustration/18.jpg",
  "/images/illustration/19.jpg",
  "/images/illustration/20.jpg",
  "/images/illustration/21.jpg",
  "/images/illustration/22.jpg",
  "/images/illustration/23.jpg",
  "/images/illustration/24.jpg",
  "/images/illustration/25.jpg",
  "/images/illustration/26.jpg",
  "/images/illustration/27.jpg",
  "/images/illustration/28.jpg",
  "/images/illustration/29.jpg",
  "/images/illustration/30.jpg",
  "/images/illustration/31.jpg",
  "/images/illustration/32.jpg",
  "/images/illustration/33.jpg",
  "/images/illustration/34.jpg",
  "/images/illustration/35.jpg",
  "/images/illustration/36.jpg",
  "/images/illustration/37.jpg",
  "/images/illustration/38.jpg",
  "/images/illustration/39.jpg",
];

// ==========================================
// 4. 空间设计 (Spatial Design)
// 请将图片上传到: public/images/spatial/
// 💡 动态排版：添加更多项目对象，列表会自动往下延伸。
// ==========================================
export const spatialProjects: ProjectItem[] = [
  { id: 1, title: "项目名称 01", description: "这里是空间设计项目 01 的详细描述文案，介绍设计理念等。", src: "/images/spatial/01.jpg", location: "Shanghai, CN", year: "2024" },
  { id: 2, title: "项目名称 02", description: "这里是空间设计项目 02 的详细描述文案，介绍设计理念等。", src: "/images/spatial/02.jpg", location: "Shanghai, CN", year: "2024" },
  { id: 3, title: "项目名称 03", description: "这里是空间设计项目 03 的详细描述文案，介绍设计理念等。", src: "/images/spatial/03.jpg", location: "Shanghai, CN", year: "2024" },
  { id: 4, title: "项目名称 04", description: "这里是空间设计项目 04 的详细描述文案，介绍设计理念等。", src: "/images/spatial/04.jpg", location: "Shanghai, CN", year: "2024" },
  { id: 5, title: "项目名称 05", description: "这里是空间设计项目 05 的详细描述文案，介绍设计理念等。", src: "/images/spatial/05.jpg", location: "Shanghai, CN", year: "2024" },
  { id: 6, title: "项目名称 06", description: "这里是空间设计项目 06 的详细描述文案，介绍设计理念等。", src: "/images/spatial/06.jpg", location: "Shanghai, CN", year: "2024" },
  { id: 7, title: "项目名称 07", description: "这里是空间设计项目 07 的详细描述文案，介绍设计理念等。", src: "/images/spatial/07.jpg", location: "Shanghai, CN", year: "2024" },
  { id: 8, title: "项目名称 08", description: "这里是空间设计项目 08 的详细描述文案，介绍设计理念等。", src: "/images/spatial/08.jpg", location: "Shanghai, CN", year: "2024" },
  { id: 9, title: "项目名称 09", description: "这里是空间设计项目 09 的详细描述文案，介绍设计理念等。", src: "/images/spatial/09.jpg", location: "Shanghai, CN", year: "2024" },
  { id: 10, title: "项目名称 10", description: "这里是空间设计项目 10 的详细描述文案，介绍设计理念等。", src: "/images/spatial/10.jpg", location: "Shanghai, CN", year: "2024" },
  { id: 11, title: "项目名称 11", description: "这里是空间设计项目 11 的详细描述文案，介绍设计理念等。", src: "/images/spatial/11.jpg", location: "Shanghai, CN", year: "2024" },
  { id: 12, title: "项目名称 12", description: "这里是空间设计项目 12 的详细描述文案，介绍设计理念等。", src: "/images/spatial/12.jpg", location: "Shanghai, CN", year: "2024" },
  { id: 13, title: "项目名称 13", description: "这里是空间设计项目 13 的详细描述文案，介绍设计理念等。", src: "/images/spatial/13.jpg", location: "Shanghai, CN", year: "2024" },
  { id: 14, title: "项目名称 14", description: "这里是空间设计项目 14 的详细描述文案，介绍设计理念等。", src: "/images/spatial/14.jpg", location: "Shanghai, CN", year: "2024" },
];

// ==========================================
// 5. 产品设计 (Product Design)
// 请将图片上传到: public/images/installation/
// 💡 动态排版：
// - 添加更多项目对象，列表会自动往下延伸。
// - 在 `galleryImages` 数组中添加任意数量的图片路径，详情页的右侧图片流会自动排版。
// ==========================================
export const installationProjects: ProjectItem[] = [
  { id: 1, title: "阿祖的小院", src: "/images/installation/01.jpg", location: "丽江", year: "2026", galleryImages: Array.from({ length: 10 }, (_, i) => `/images/installation/01-${i + 1}.jpg`) },
  { id: 2, title: "昆明国际咖啡展", src: "/images/installation/02.jpg", location: "昆明", year: "2025", galleryImages: Array.from({ length: 4 }, (_, i) => `/images/installation/02-${i + 1}.jpg`) },
  { id: 3, title: "普洱茶", src: "/images/installation/03.jpg", location: "昆明", year: "2025", galleryImages: Array.from({ length: 4 }, (_, i) => `/images/installation/03-${i + 1}.jpg`) },
  { id: 4, title: "岚·Bistro", src: "/images/installation/04.jpg", location: "丽江", year: "2025", galleryImages: Array.from({ length: 4 }, (_, i) => `/images/installation/04-${i + 1}.jpg`) },
  { id: 5, title: "食谷者 X 华侨城恐龙谷", src: "/images/installation/05.jpg", location: "昆明", year: "2024", galleryImages: Array.from({ length: 4 }, (_, i) => `/images/installation/05-${i + 1}.jpg`) },
  { id: 6, title: "茜姿兰", src: "/images/installation/06.jpg", location: "昆明", year: "2023", galleryImages: Array.from({ length: 10 }, (_, i) => `/images/installation/06-${i + 1}.jpg`) },
  { id: 7, title: "普洱", src: "/images/installation/07.jpg", location: "昆明", year: "2023", galleryImages: Array.from({ length: 20 }, (_, i) => `/images/installation/07-${i + 1}.jpg`) },
  { id: 8, title: "健康日记", src: "/images/installation/08.jpg", location: "昆明", year: "2023", galleryImages: Array.from({ length: 12 }, (_, i) => `/images/installation/08-${i + 1}.jpg`) },
  { id: 9, title: "泽彝", src: "/images/installation/09.jpg", location: "楚雄", year: "2023", galleryImages: Array.from({ length: 12 }, (_, i) => `/images/installation/09-${i + 1}.jpg`) },
  { id: 10, title: "南嵩", src: "/images/installation/10.jpg", location: "浙江", year: "2023", galleryImages: Array.from({ length: 4 }, (_, i) => `/images/installation/10-${i + 1}.jpg`) },
  { id: 11, title: "鸢尾", src: "/images/installation/11.jpg", location: "丽江", year: "2023", galleryImages: Array.from({ length: 9 }, (_, i) => `/images/installation/11-${i + 1}.jpg`) },
  { id: 12, title: "蓬松生活", src: "/images/installation/12.jpg", location: "武汉", year: "2022", galleryImages: Array.from({ length: 5 }, (_, i) => `/images/installation/12-${i + 1}.jpg`) },
  { id: 13, title: "云南省阜外心血管病医院", src: "/images/installation/13.jpg", location: "昆明", year: "2022", galleryImages: Array.from({ length: 4 }, (_, i) => `/images/installation/13-${i + 1}.jpg`) },
  { id: 14, title: "孔子学院", src: "/images/installation/14.jpg", location: "曲阜", year: "2021", galleryImages: Array.from({ length: 11 }, (_, i) => `/images/installation/14-${i + 1}.jpg`) },
  { id: 15, title: "naravan", src: "/images/installation/15.jpg", location: "墨西哥", year: "2020", galleryImages: Array.from({ length: 12 }, (_, i) => `/images/installation/15-${i + 1}.jpg`) },
  { id: 16, title: "中环·卡地亚", src: "/images/installation/16.jpg", location: "香港", year: "2020", galleryImages: Array.from({ length: 5 }, (_, i) => `/images/installation/16-${i + 1}.jpg`) },
  { id: 17, title: "十木草", src: "/images/installation/17.jpg", location: "大理", year: "2019", galleryImages: Array.from({ length: 8 }, (_, i) => `/images/installation/17-${i + 1}.jpg`) },
  { id: 18, title: "话说大理", src: "/images/installation/18.jpg", location: "大理", year: "2019", galleryImages: Array.from({ length: 8 }, (_, i) => `/images/installation/18-${i + 1}.jpg`) },
  { id: 19, title: "CORAL CLUB", src: "/images/installation/19.jpg", location: "加拿大", year: "2019", galleryImages: Array.from({ length: 8 }, (_, i) => `/images/installation/19-${i + 1}.jpg`) },
  { id: 20, title: "丹寨万达小镇", src: "/images/installation/20.jpg", location: "西安", year: "2019", galleryImages: Array.from({ length: 3 }, (_, i) => `/images/installation/20-${i + 1}.jpg`) },
  { id: 21, title: "竹屿青山", src: "/images/installation/21.jpg", location: "丽江", year: "2018", galleryImages: Array.from({ length: 1 }, (_, i) => `/images/installation/21-${i + 1}.jpg`) },
  { id: 22, title: "槐山脚下", src: "/images/installation/22.jpg", location: "西安", year: "2018", galleryImages: Array.from({ length: 5 }, (_, i) => `/images/installation/22-${i + 1}.jpg`) },
  { id: 23, title: "月咏堂", src: "/images/installation/23.jpg", location: "丽江", year: "2017", galleryImages: Array.from({ length: 5 }, (_, i) => `/images/installation/23-${i + 1}.jpg`) },
  { id: 24, title: "应時發生", src: "/images/installation/24.jpg", location: "昆明", year: "2017", galleryImages: Array.from({ length: 8 }, (_, i) => `/images/installation/24-${i + 1}.jpg`) },
  { id: 25, title: "RUNNING HAM", src: "/images/installation/25.jpg", location: "丽江", year: "2017", galleryImages: Array.from({ length: 8 }, (_, i) => `/images/installation/25-${i + 1}.jpg`) },
];

// ==========================================
// 6. 模特经纪 (MCN) - 上下双排跑马灯
// 请将图片上传到: public/images/mcn/
// 💡 动态排版：在 modelA 或 modelB 数组中添加任意数量的图片，跑马灯会自动适应。
// ==========================================
export const mcnModelAImages = [
  "/images/mcn/model-a-01.jpg",
  "/images/mcn/model-a-02.jpg",
  "/images/mcn/model-a-03.jpg",
  "/images/mcn/model-a-04.jpg",
  "/images/mcn/model-a-05.jpg",
  "/images/mcn/model-a-06.jpg",
  "/images/mcn/model-a-07.jpg",
  "/images/mcn/model-a-08.jpg",
  "/images/mcn/model-a-09.jpg",
  "/images/mcn/model-a-10.jpg",
  "/images/mcn/model-a-11.jpg",
  "/images/mcn/model-a-12.jpg",
  "/images/mcn/model-a-13.jpg",
  "/images/mcn/model-a-14.jpg",
];

export const mcnModelBImages = [
  "/images/mcn/model-b-01.jpg",
  "/images/mcn/model-b-02.jpg",
  "/images/mcn/model-b-03.jpg",
  "/images/mcn/model-b-04.jpg",
  "/images/mcn/model-b-05.jpg",
  "/images/mcn/model-b-06.jpg",
  "/images/mcn/model-b-07.jpg",
  "/images/mcn/model-b-08.jpg",
  "/images/mcn/model-b-09.jpg",
  "/images/mcn/model-b-10.jpg",
  "/images/mcn/model-b-11.jpg",
  "/images/mcn/model-b-12.jpg",
  "/images/mcn/model-b-13.jpg",
  "/images/mcn/model-b-14.jpg",
  "/images/mcn/model-b-15.jpg",
  "/images/mcn/model-b-16.jpg",
  "/images/mcn/model-b-17.jpg",
  "/images/mcn/model-b-18.jpg",
  "/images/mcn/model-b-19.jpg",
  "/images/mcn/model-b-20.jpg",
  "/images/mcn/model-b-21.jpg",
  "/images/mcn/model-b-22.jpg",
];
