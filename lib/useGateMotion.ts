'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
export function useGateMotion(initial=0){
 const[position,setPosition]=useState(initial);const[target,setTarget]=useState(initial);const[moving,setMoving]=useState(false);const current=useRef(initial);const goal=useRef(initial);const raf=useRef(0);
 const move=useCallback((next:number,immediate=false)=>{const to=Math.max(0,Math.min(1,next));cancelAnimationFrame(raf.current);goal.current=to;setTarget(to);if(immediate||window.matchMedia('(prefers-reduced-motion: reduce)').matches){current.current=to;setPosition(to);setMoving(false);return}const from=current.current;const start=performance.now();const duration=180+Math.abs(to-from)*380;setMoving(true);const tick=(now:number)=>{const t=Math.min(1,(now-start)/duration);const eased=1-Math.pow(1-t,3);current.current=from+(to-from)*eased;setPosition(current.current);if(t<1)raf.current=requestAnimationFrame(tick);else setMoving(false)};raf.current=requestAnimationFrame(tick)},[]);
 const toggle=useCallback(()=>move(goal.current>.5?0:1),[move]);
 useEffect(()=>{const mq=window.matchMedia('(prefers-reduced-motion: reduce)');const changed=()=>{if(mq.matches){cancelAnimationFrame(raf.current);current.current=goal.current;setPosition(goal.current);setMoving(false)}};mq.addEventListener('change',changed);return()=>{cancelAnimationFrame(raf.current);mq.removeEventListener('change',changed)}},[]);return{position,target,moving,move,toggle};
}
