import type {CSSProperties} from 'react';
import './autumn-leaves.css';

/** Change to false to turn off all autumn decoration. */
export const AUTUMN_LEAVES_ENABLED = true;

// Negative delays spread these small maple leaves through each scene on first paint.
const leaves=[
 {x:5,size:25,delay:-11,duration:19,drift:80,turn:-105,tone:'amber'},
 {x:14,size:18,delay:-3,duration:23,drift:-45,turn:130,tone:'copper'},
 {x:25,size:30,delay:-15,duration:25,drift:72,turn:-155,tone:'gold'},
 {x:38,size:17,delay:-8,duration:21,drift:-64,turn:115,tone:'amber'},
 {x:53,size:23,delay:-17,duration:26,drift:48,turn:-120,tone:'copper'},
 {x:64,size:17,delay:-5,duration:22,drift:-73,turn:135,tone:'gold'},
 {x:78,size:27,delay:-13,duration:24,drift:65,turn:-105,tone:'amber'},
 {x:91,size:20,delay:-20,duration:27,drift:-75,turn:155,tone:'copper'},
 {x:7,size:15,delay:-6,duration:28,drift:45,turn:-135,tone:'gold'},
 {x:87,size:15,delay:-10,duration:22,drift:-50,turn:120,tone:'amber'},
] as const;

export default function AutumnLeaves({enabled=AUTUMN_LEAVES_ENABLED}:{enabled?:boolean}){
 if(!enabled)return null;
 return <div className="autumn-leaves" aria-hidden="true">{leaves.map((leaf,i)=><svg key={i} className={`autumn-leaf tone-${leaf.tone}`} viewBox="0 0 64 78" style={{left:`${leaf.x}%`,width:leaf.size,height:leaf.size*1.22,'--delay':`${leaf.delay}s`,'--duration':`${leaf.duration}s`,'--drift':`${leaf.drift}px`,'--turn':`${leaf.turn}deg`} as CSSProperties} focusable="false">
  <path d="M31 2 36 14 42 9 43 21 54 17 51 29 62 31 53 39 57 49 44 47 40 58 33 54 31 68 29 54 22 58 18 47 5 49 9 39 1 31 12 29 9 17 20 21 21 9 27 14Z" fill="currentColor"/>
  <path d="M31 43v31M31 53 15 31m16 19 17-21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
 </svg>)}</div>;
}
