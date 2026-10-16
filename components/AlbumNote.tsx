import type {ReactNode} from 'react';
import {Lightbulb} from 'lucide-react';
export default function AlbumNote({title='Заметка мастера',children,className=''}:{title?:string;children:ReactNode;className?:string}){return <aside className={'album-note '+className}><Lightbulb size={19} aria-hidden/><div><strong>{title}</strong><div aria-live="polite">{children}</div></div></aside>}
