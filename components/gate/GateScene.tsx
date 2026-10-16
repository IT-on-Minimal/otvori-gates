'use client';
import Photo from '@/components/Photo';import GateVisual,{type GateVisualProps} from './GateVisual';import type {CSSProperties,PointerEventHandler,ReactNode} from 'react';
type Props=GateVisualProps&{className?:string;children?:ReactNode;priority?:boolean;wash?:number;style?:CSSProperties;onPointerDown?:PointerEventHandler<HTMLDivElement>;onPointerMove?:PointerEventHandler<HTMLDivElement>;onPointerUp?:PointerEventHandler<HTMLDivElement>;onPointerCancel?:PointerEventHandler<HTMLDivElement>};
export default function GateScene({className='',children,priority=false,wash=0,style,onPointerDown,onPointerMove,onPointerUp,onPointerCancel,...gate}:Props){return <div className={'layered-scene '+className} style={style} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerCancel}>
 <Photo className="world-background" src="/images/house.webp" alt="Концепция въезда к дому среди берёз и сосен в Подмосковье" width={1536} height={1024} fetchPriority={priority?'high':'auto'} loading={priority?'eager':'lazy'}/>
 <div className="world-wash" style={{opacity:wash}}/>
 <GateVisual {...gate} photo/>
 <Photo className="world-foreground" style={{opacity:gate.assembly===undefined?1:Math.max(0,Math.min(1,(gate.assembly-2.7)/1.3))}} src="/images/house.webp" alt="" aria-hidden width={1536} height={1024} loading={priority?'eager':'lazy'}/>
 {children}
 </div>}
