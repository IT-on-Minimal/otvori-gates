'use client';
import Image,{type ImageProps} from 'next/image';
import {sitePath} from '@/lib/sitePath';
export default function Photo(props:ImageProps){return <Image {...props} loader={({src,width})=>sitePath(src.startsWith('/images/')&&width<=768?src.replace('.webp','-768.webp'):src)} sizes={props.sizes||'(max-width: 768px) 100vw, 60vw'}/>}
