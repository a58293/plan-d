type DetailLink = {label:string;kind:'eyes'|'wigs'|'clothing'|'jewelry'};

export const jingxinDetailLinks:Record<string,DetailLink[]>={
  face:[{label:'镜昕的目光',kind:'eyes'}],
  headdress:[{label:'镜昕的游丝',kind:'wigs'},{label:'镜昕的流光',kind:'jewelry'}],
  ornament:[{label:'镜昕的流光',kind:'jewelry'}],
  dress:[{label:'镜昕的衣袂',kind:'clothing'}],
};

export function detailAccessoryHref(kind:DetailLink['kind'],detail:string){
  return `/accessories/${kind}?from=jingxin&detail=${encodeURIComponent(detail)}`;
}

export function detailReturnHref(detail:string){
  return `/series/flower-gods/jingxin?detail=${encodeURIComponent(detail)}#details`;
}
