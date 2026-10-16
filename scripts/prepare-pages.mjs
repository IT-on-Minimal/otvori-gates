import {existsSync,mkdirSync,readdirSync,renameSync,copyFileSync,writeFileSync} from 'node:fs';
import {join,dirname,relative} from 'node:path';

const root=join(process.cwd(),'dist/client');
if(!existsSync(join(root,'index.html')))throw new Error('Static export missing dist/client/index.html');
const prefix=(process.env.NEXT_PUBLIC_BASE_PATH||'').replace(/^\//,'');
if(prefix){
 const nested=join(root,prefix,'_next');
 if(!existsSync(nested))throw new Error(`Expected prefixed assets in ${nested}`);
 if(existsSync(join(root,'_next')))throw new Error('Unexpected _next directory already exists');
 renameSync(nested,join(root,'_next'));
}
function visit(dir){
 for(const entry of readdirSync(dir,{withFileTypes:true})){
  const path=join(dir,entry.name);
  if(entry.isDirectory())visit(path);
  else if(entry.name.endsWith('.html')&&!['index.html','404.html'].includes(entry.name)){
   const destination=join(dirname(path),entry.name.slice(0,-5),'index.html');
   mkdirSync(dirname(destination),{recursive:true});copyFileSync(path,destination);
  }
 }
}
visit(root);
writeFileSync(join(root,'.nojekyll'),'');
const siteOrigin=process.env.NEXT_PUBLIC_SITE_ORIGIN;
if(siteOrigin){
 const pages=['/',...readdirSync(root,{withFileTypes:true}).filter(entry=>entry.isDirectory()&&!entry.name.startsWith('.')&&!['images','_next','privacy','consent-personal-data',prefix].includes(entry.name)).map(entry=>'/'+entry.name+'/')];
 const projectsDir=join(root,'projects');
 if(existsSync(projectsDir))pages.push(...readdirSync(projectsDir,{withFileTypes:true}).filter(entry=>entry.isDirectory()).map(entry=>'/projects/'+entry.name+'/'));
 writeFileSync(join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+pages.map(path=>'  <url><loc>'+siteOrigin+path+'</loc></url>').join('\n')+'\n</urlset>\n');
 writeFileSync(join(root,'robots.txt'),`User-agent: *\nAllow: /\nDisallow: /${prefix?prefix+'/':''}privacy/\nDisallow: /${prefix?prefix+'/':''}consent-personal-data/\nSitemap: ${siteOrigin}/sitemap.xml\n`);
}
console.log(`GitHub Pages files prepared in ${root}${prefix?' for /'+prefix+'/':' for site root'}`);
