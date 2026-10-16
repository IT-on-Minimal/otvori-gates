'use client';
import {Play,Pause} from 'lucide-react';
import GateScene from './GateScene';
import {useGateMotion} from '@/lib/useGateMotion';
export default function GateTry({type='Откатные'}:{type?:string}){const motion=useGateMotion();return <div className="photo-mount gate-try"><GateScene type={type} open={motion.position} color="#383c3d" infill={type==='Распашные'?'Вертикальные ламели':'Горизонтальные ламели'}><span className="scene-concept">Концептуальная визуализация</span></GateScene><div className="gate-try-controls"><button className="button outline" onClick={motion.toggle}>{motion.target>.5?<Pause size={17}/>:<Play size={17}/>} {motion.target>.5?'Закрыть':'Посмотреть открывание'}</button></div></div>}
