'use client';
import {useEffect,useRef,useState} from 'react';
import {Layers,Frame,Palette,Radio,Check,Play,Pause,MoveHorizontal,Mountain,Plus,Ruler,Plug,Wrench,DoorOpen,Eye,EyeOff} from 'lucide-react';
import GateScene from '../gate/GateScene';import GateVisual from '../gate/GateVisual';import AlbumNote from '../AlbumNote';
import {useGateMotion} from '@/lib/useGateMotion';import {GatePlan} from './GateComparator';import {estimateFactors,gateParts,stages} from '@/data/site';
const stageIcons=[Layers,Frame,Palette,Radio,Check];

export function ScrollStory(){
 const [amount,setAmount]=useState(0);const [playing,setPlaying]=useState(false);const raf=useRef(0);const motion=useGateMotion();const stage=Math.min(4,Math.floor(amount));
 useEffect(()=>()=>cancelAnimationFrame(raf.current),[]);
 function choose(i:number){cancelAnimationFrame(raf.current);setPlaying(false);setAmount(i);motion.move(i===4?1:0,true)}
 function play(){cancelAnimationFrame(raf.current);if(playing){setPlaying(false);return}motion.move(0,true);if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){choose(4);return}setPlaying(true);const start=performance.now();const tick=(now:number)=>{const a=Math.min(4,(now-start)/650);setAmount(a);if(a<4)raf.current=requestAnimationFrame(tick);else{setPlaying(false);motion.move(1)}};raf.current=requestAnimationFrame(tick)}
 return <section className="section album-assembly" aria-label="Как собирается ваш въезд"><div className="container">
  <div className="split-heading"><div><p className="eyebrow">Детали складываются в ваш въезд</p><h2>Соберём по частям.<br/><em>Увидим целиком.</em></h2></div><button className="button outline" onClick={play}>{playing?<Pause size={18}/>:<Play size={18}/>} {playing?'Приостановить':'Собрать за несколько секунд'}</button></div>
  <div className="assembly-album"><div className="photo-mount assembly-photo"><GateScene assembly={amount} open={stage===4?motion.position:0} wash={Math.max(0,.65-amount*.16)}><span className="scene-label assembly-label">0{stage+1} · {stages[stage].short}</span><span className="scene-concept">Концептуальная визуализация</span></GateScene><div className="assembly-current" aria-live="polite"><strong>{stages[stage].title}</strong><p>{stages[stage].text}</p></div></div>
   <div className="assembly-pieces">{stages.map((s,i)=>{const Icon=stageIcons[i];return <button key={s.short} className={'album-choice piece-card '+(i===stage?'selected':'')} aria-current={i===stage?'step':undefined} onClick={()=>choose(i)}><span className="piece-number">0{i+1}</span><Icon size={25}/><span><strong>{s.short}</strong><small>{['Размеры, грунт, опоры','Ровная и прочная основа','Рисунок и оттенок','Движение и управление','Можно возвращаться домой'][i]}</small></span>{i<stage&&<Check size={17} className="piece-check"/>}</button>})}<AlbumNote title="Договоримся до изготовления">Сначала согласуем внешний вид и комплектацию, затем соберём ваше решение.</AlbumNote></div>
  </div>
 </div></section>;
}

const comfortFinishes=[{name:'Графит',value:'#383c3d'},{name:'Древесный оттенок',value:'#95704b'},{name:'Светлый серый',value:'#b8beb8'}];
const comforts=[
 {label:'Плавный ход',title:'Открываются без суеты',text:'Ровная рама, подобранные опоры и настройка помогают створке двигаться плавно.',icon:MoveHorizontal},
 {label:'Одно нажатие',title:'Вы остаётесь в машине',text:'Пульт открывает и закрывает въезд. Привод подбираем под вес створки и частоту открываний.',icon:Radio},
 {label:'В стиле дома',title:'Оттенок меняет впечатление',text:'Тёмный цвет поддерживает линии фасада. Светлый делает въезд легче. Примерьте варианты на одном доме.',icon:Palette},
 {label:'Приватность',title:'Столько открытости, сколько нужно',text:'Сплошное заполнение закрывает двор. Зазоры между планками дают больше света и обзора.',icon:Eye}
];
export function Explorer(){
 const [selected,setSelected]=useState(0);
 const [part,setPart]=useState(0);
 const [finish,setFinish]=useState(0);
 const [privateView,setPrivate]=useState(true);
 const motion=useGateMotion();const current=comforts[selected];const Icon=current.icon;
 function changeFinish(){setFinish(i=>(i+1)%comfortFinishes.length);motion.move(0)}
 function select(i:number){
  setSelected(i);
  if(i===2){changeFinish();return}
  if(i===3){setPrivate(v=>!v);motion.move(0);return}
  if(i===1)motion.toggle();else motion.move(1);
 }
 return <section className="section comfort-section album-comfort" id="engineering"><div className="container">
  <div className="split-heading"><div><p className="eyebrow">Удобно каждый день</p><h2>Красиво снаружи.<br/><em>Спокойно дома.</em></h2></div><p>Посмотрите, как детали въезда работают в обычной жизни.</p></div>
  <div className="comfort-album">
   <div className="comfort-choice-grid">{comforts.map((c,i)=>{const I=c.icon;return <button key={c.label} className={'album-choice '+(i===selected?'selected':'')} onClick={()=>select(i)} aria-pressed={i===selected}><I size={25}/><span><strong>{c.label}</strong><small>{['Ровное движение','Управление с пульта','Примерка оттенков','Свет и обзор'][i]}</small></span></button>})}<div className="comfort-caption" aria-live="polite"><Icon size={25}/><h3>{current.title}</h3><p>{current.text}</p></div></div>
   <div className="comfort-display">
    <div className="photo-mount">
     <GateScene open={motion.position} color={comfortFinishes[finish].value} infill={selected===3&&!privateView?'Металлический штакетник':'Горизонтальные ламели'} highlight={selected===1?4:-1}><span className="scene-label comfort-scene-label">{selected===2?comfortFinishes[finish].name:current.label}</span><span className="scene-concept">Концептуальная визуализация</span></GateScene>
     <div className="comfort-actions">
      {selected===3?<button className="button light" aria-pressed={privateView} onClick={()=>setPrivate(!privateView)}>{privateView?<Eye size={18}/>:<EyeOff size={18}/>} {privateView?'Показать зазоры':'Закрыть двор'}</button>:selected===2?<button className="button" onClick={changeFinish}><Palette size={18}/>Другой оттенок</button>:<button className="button" onClick={motion.toggle}>{motion.target>.5?'Закрыть ворота':'Открыть ворота'}</button>}
      {selected===2&&<span className="comfort-finish" aria-live="polite"><span style={{background:comfortFinishes[finish].value}}/>{comfortFinishes[finish].name}</span>}
     </div>
    </div>
    <AlbumNote title={selected===2?'В гармонии с фасадом':selected===3?'Рисунок имеет значение':'Заметка мастера'}>{selected===2?'Окончательный оттенок согласуем по образцу — с учётом фасада, крыши и ограждения.':selected===3?'Заполнение выбираем по внешнему виду, приватности и условиям участка.':'После монтажа проверим ход и управление вместе с вами.'}</AlbumNote>
   </div>
  </div>
  <details className="construction-details"><summary><span>Любопытно, что внутри?</span><span>Детали конструкции</span><Plus size={19}/></summary><div className="construction-inside"><div className="technical-panel"><GateVisual technical highlight={part}/></div><div><div className="part-list">{gateParts.map((p,i)=><button key={p.name} onClick={()=>setPart(i)} className={i===part?'active':''}><span>0{i+1}</span>{p.name}</button>)}</div><div className="part-detail" aria-live="polite"><h3>{gateParts[part].name}</h3><p>{gateParts[part].value}</p><p className="muted">{gateParts[part].tech}</p></div></div></div></details>
 </div></section>;
}

const factorIcons=[Ruler,MoveHorizontal,Mountain,Frame,Plug,Wrench,Radio,Palette,DoorOpen];
const buyerFactors=[0,1,2,3,7];
const markerSpots=[[494,472],[829,447],[649,480],[356,443],[642,407],[420,516],[636,453],[493,440],[250,436]];
export function Estimate(){const [selected,setSelected]=useState(0);const index=buyerFactors[selected];const factor=estimateFactors[index];const Icon=factorIcons[index];const [x,y]=markerSpots[index];return <section className="estimate section album-estimate" id="estimate"><div className="container">
 <div className="split-heading"><div><p className="eyebrow">Прозрачный расчёт</p><h2>Что влияет<br/><em>на стоимость.</em></h2></div><p>На замере проверим размеры, опоры и условия монтажа. В расчёте отдельно покажем конструкцию, комплектацию и работы на участке.</p></div>
 <div className="estimate-album"><div className="estimate-factor-grid">{buyerFactors.map((n,i)=>{const f=estimateFactors[n],I=factorIcons[n];return <button key={f.title} className={'album-choice '+(i===selected?'selected':'')} onClick={()=>setSelected(i)} aria-pressed={i===selected}><span className="estimate-number">0{i+1}</span><I size={23}/><strong>{f.title}</strong></button>})}</div><div className="estimate-picture"><div className="photo-mount"><GatePlan factor={index}/><span className="estimate-marker" style={{left:`${x/10}%`,top:`${y/6.67}%`}} aria-hidden="true">0{selected+1}</span><div className="estimate-caption" key={selected} aria-live="polite"><Icon size={24}/><div><h3>{factor.title}</h3><p>{factor.text}</p></div></div></div><AlbumNote title="Сначала согласуем расчёт">До изготовления обсудим состав работ и комплектацию.</AlbumNote></div></div>
 <div className="estimate-composition" aria-label="Состав расчёта"><span><Frame size={22}/>Конструкция</span><b>+</b><span><Radio size={22}/>Комплектация</span><b>+</b><span><Wrench size={22}/>Работы на участке</span><b>=</b><span className="estimate-total">Ваш согласованный расчёт</span></div>
 </div></section>}
