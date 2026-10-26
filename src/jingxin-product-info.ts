// Shared by desktop and mobile; do not invent unconfirmed product policies.
import {officialInfo, officialServiceCopy, productLeadTimeNote} from './official-info';

export const jingxinProductInfo = [
  ['尺寸规格', '70 · 3分'],
  ['材质', '环保三抗树脂'],
  ['肤色', 'mia白 · mia粉 · 普肌'],
  ['眼珠', '尺寸 14/5，适配 16/5'],
  ['服装配件', '战国袍、披帛、荷叶披肩、拖尾薄纱'],
  ['商品细节', officialInfo.productDetailsSource],
  ['商品制作周期', productLeadTimeNote],
  ['配送方式', `${officialInfo.courier}（占位，承运方待确定）`],
  ['日常养护', officialInfo.dailyCare],
  ['售后与退换', officialServiceCopy.afterSales],
  ['防伪验证', officialServiceCopy.verification],
] as const;
