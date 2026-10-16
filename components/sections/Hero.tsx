'use client';
import {Play, Pause, ArrowRight} from 'lucide-react';
import GateScene from '../gate/GateScene';
import {useGateMotion} from '@/lib/useGateMotion';
import {track} from '@/lib/analytics';
import AutumnLeaves from '@/components/AutumnLeaves';

export default function Hero(){
 const gate=useGateMotion();
 const toggle=()=>{gate.toggle();track('gate_open')};
 return <section className="hero hero-refined album-hero simple-hero"><AutumnLeaves/>
  <div className="hero-copy"><p className="eyebrow">Москва и Московская область</p><h1>Ворота для<br/><em>частного дома.</em></h1><p className="hero-description">Изготавливаем и устанавливаем откатные и распашные ворота. Подберём конструкцию по участку, согласуем заполнение, цвет и автоматику.</p><div className="hero-cta"><a className="button" href="#request" onClick={()=>track('hero_cta_click')}>Обсудить заказ <ArrowRight size={17}/></a><a className="text-link" href="#configurator">Выбрать тип ворот</a></div><p className="hero-assurance">Можно начать с фото участка. Если размеров пока нет, уточним их на замере.</p></div>
  <div className="hero-media"><div className="photo-mount hero-mount"><GateScene className="hero-world" priority open={gate.position} color="#383c3d" infill="Горизонтальные ламели"><div className="scene-top"><span className="scene-label">Откатные ворота · пример</span></div><span className="scene-concept">Концептуальная визуализация</span></GateScene><div className="hero-simple-control"><button className="button" onClick={toggle} aria-pressed={gate.target>.5}>{gate.target>.5?<Pause size={17}/>:<Play size={17}/>} {gate.target>.5?'Закрыть':'Открыть'}</button><span aria-live="polite">{gate.moving?(gate.target>.5?'Открываются':'Закрываются'):(gate.position>.98?'Открыты':'Закрыты')}</span></div></div><div className="hero-after-notes"><span className="album-stamp">Подбор · замер · изготовление · монтаж</span></div></div>
 </section>
}
