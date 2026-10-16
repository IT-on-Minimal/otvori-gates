import {siteOrigin} from '@/lib/sitePath';
import type{MetadataRoute}from'next';export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/',disallow:['/api/','/privacy','/consent-personal-data']},sitemap:siteOrigin+'/sitemap.xml'}}
