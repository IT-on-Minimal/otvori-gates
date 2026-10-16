/** Local links and images for a GitHub Pages project repository or a root site. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export function sitePath(path:string){
 if(!path.startsWith('/')||path.startsWith('//'))return path;
 const separator=path.search(/[?#]/);
 const pathname=separator<0?path:path.slice(0,separator);
 const suffix=separator<0?'':path.slice(separator);
 const normalized=pathname==='/'||/\.[a-z0-9]+$/i.test(pathname)?pathname:pathname+'/';
 return basePath+normalized+suffix;
}
export const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://otvori-new-2026.moonstrike2020.chatgpt.site';
