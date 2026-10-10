// The local editor exports a project JSON. Place an approved export beside this
// file as jingxin-project.json to publish its timing, framing and image layers.
// The visitor never sees the editor itself.
(async()=>{
  const api=window.storyPreview;
  if(!api)return;
  try{
    const response=await fetch('./jingxin-project.json',{cache:'no-store'});
    if(!response.ok||!response.headers.get('content-type')?.includes('json'))return;
    const project=await response.json();
    if(project?.type!=='lumen-story-preview'||project.version!==1)return;
    api.applySettings(project.settings);
    for(const [id,item] of Object.entries(project.images||{})){
      if(api.art.some(art=>art.id===id)&&typeof item?.dataURL==='string'&&/^data:image\/(png|jpeg|webp);base64,/.test(item.dataURL))api.setImage(id,item.dataURL);
    }
  }catch{ /* Keep the approved default scene when no export is supplied. */ }
})();
