把以下文件覆盖到项目同路径：

- src/App.tsx
- src/content.ts
- src/components/HomeGallery.tsx
- src/components/StudioIntro.tsx
- src/components/IllustrationGallery.tsx

商业海报图片目录请按下面结构创建，并把 count 改成真实数量：
- public/images/illustration/anime/01.jpg + 01.webp ...
- public/images/illustration/film/01.jpg + 01.webp ...
- public/images/illustration/game/01.jpg + 01.webp ...

当前默认每个文件夹 13 张：
- anime: 13
- film: 13
- game: 13
在 src/content.ts 里修改 illustrationCategoryCounts 即可。
