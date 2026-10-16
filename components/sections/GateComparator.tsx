'use client';
import {sitePath} from '@/lib/sitePath';
import {useEffect,useId,useState} from 'react';
import {MoveHorizontal,RotateCw,Play,Pause,CarFront,Ruler} from 'lucide-react';
import GateScene from '../gate/GateScene';
import AlbumNote from '../AlbumNote';
import {useGateMotion} from '@/lib/useGateMotion';

export function GatePlan({type='Откатные',open=0,factor=-1,carY}:{type?:string;open?:number;factor?:number;carY?:number}) {
 const id=useId().replace(/:/g,'');const swing=type==='Распашные';const a=open*Math.PI/2;
 const spots=[[494,472],[829,447],[649,480],[356,443],[642,407],[420,516],[636,453],[493,440],[250,436]];const point=spots[Math.max(0,factor)];
 return <svg className="gate-plan photo-plan" viewBox="0 0 1000 667" role="img" aria-label={swing?'Вид сверху: две створки поворачиваются внутрь участка':'Вид сверху: створка уходит вправо вдоль ограждения'}>
  <defs><pattern id={'space-hatch-'+id} width="13" height="13" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><path d="M0 0V13" stroke="#f8d7a0" strokeWidth="3" opacity=".65"/></pattern><clipPath id={'plan-gate-clip-'+id}><rect x="363" y="410" width="263" height="85"/></clipPath></defs>
  <image href={sitePath('/images/overhead.webp')} width="1000" height="667"/>
  {swing?<><path d="M363 442V310A132 132 0 0 1 495 442ZM626 442V310A131 131 0 0 0 495 442Z" fill="#f8d7a028" stroke="#f8d7a0" strokeWidth="2" strokeDasharray="6 5"/><path d={`M363 442L${363+132*Math.cos(a)} ${442-132*Math.sin(a)}M626 442L${626-131*Math.cos(a)} ${442-131*Math.sin(a)}`} stroke="#303a32" strokeWidth="10"/><path d={`M363 442L${363+132*Math.cos(a)} ${442-132*Math.sin(a)}M626 442L${626-131*Math.cos(a)} ${442-131*Math.sin(a)}`} stroke="#c2bdab" strokeWidth="1.5"/></>:<><rect x="646" y="429" width="285" height="26" fill={`url(#space-hatch-${id})`} stroke="#f8d7a0" strokeWidth="2" strokeDasharray="6 5"/><g clipPath={`url(#plan-gate-clip-${id})`}><path d={`M${363+open*270} 442H${626+open*270}`} stroke="#303a32" strokeWidth="10"/><path d={`M${363+open*270} 438H${626+open*270}`} stroke="#c2bdab" strokeWidth="1.5"/></g></>}
  {factor>=0&&<g>{factor===0?<path d="M365 497H625M365 487v20M625 487v20" stroke="#fff0c9" strokeWidth="3"/>:<circle cx={point[0]} cy={point[1]} r="40" fill="#f8d7a030" stroke="#fff0c9" strokeWidth="3" strokeDasharray="8 5"/>}</g>}
  {carY!==undefined&&<g className="plan-car" style={{transform:`translate(0,${carY}px)`}}><image href={sitePath('/images/car.webp')} x="453" y="0" width="88" height="132"/></g>}
 </svg>;
}

export default function GateComparator(){
 const [type,setType]=useState('Откатные');const [arrived,setArrived]=useState(false);const motion=useGateMotion();const swing=type==='Распашные';
 useEffect(()=>{if(!motion.moving&&motion.position>.999)setArrived(true)},[motion.position,motion.moving]);
 return <section className="compare-section section album-compare" id="compare"><div className="container">
  <div className="split-heading"><div><p className="eyebrow">Сначала — место для движения</p><h2>Один въезд.<br/><em>Два способа открыть.</em></h2></div><p>Выберите вариант и откройте ворота.<br/>Вид сверху покажет, какое пространство нужно оставить свободным.</p></div>
  <div className="comparison-choices" role="group" aria-label="Тип ворот">{['Откатные','Распашные'].map(t=><button key={t} className={'album-choice '+(t===type?'selected':'')} aria-pressed={t===type} onClick={()=>{motion.move(0,true);setArrived(false);setType(t)}}>{t==='Откатные'?<MoveHorizontal size={25}/>:<RotateCw size={25}/>}<span><strong>{t}</strong><small>{t==='Откатные'?'Створка уходит вдоль ограждения':'Две створки поворачиваются во двор'}</small></span><span className="choice-check">{t===type?'✓':''}</span></button>)}</div>
  <div className="compare-layout"><div className="compare-world photo-mount"><GateScene open={motion.position} type={type} infill={swing?'Вертикальные ламели':'Горизонтальные ламели'} color='#383c3d'><div className="compare-callout"><span>0{swing?'2':'1'}</span><span>{swing?'Место перед створками':'Место вдоль забора'}</span></div><span className="scene-concept">Концептуальная визуализация</span></GateScene><div className="compare-control"><button className="button" onClick={motion.toggle}>{motion.target>.5?<Pause size={17}/>:<Play size={17}/>} {motion.target>.5?'Закрыть ворота':'Открыть ворота'}</button><span>{motion.moving?'В движении':motion.position>.98?'Можно въезжать':'Проезд закрыт'}</span></div></div>
   <div className="compare-explanation"><div className="photo-mount aerial-mount"><div className="plan-heading"><Ruler size={18}/>Тот же въезд · вид сверху</div><GatePlan key={type} type={type} open={motion.position} carY={arrived?250:500}/><div className="aerial-caption"><CarFront size={18}/>{arrived?'Машина въезжает после открытия':'Сначала открываем, затем въезжаем'}</div></div><AlbumNote title={swing?'Оставим место для поворота':'Проверим линию отката'}>{swing?'Учитываем парковку, уклон и снег перед створками.':'Свободная зона обычно длиннее проёма. Точные размеры определим на замере.'}</AlbumNote></div>
  </div>
 </div></section>;
}
