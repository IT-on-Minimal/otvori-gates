'use client';
import {useId,useState} from 'react';
import {MessageCircle} from 'lucide-react';

export default function FAQAccordion({items}:{items:ReadonlyArray<ReadonlyArray<string>>}){
 const [active,setActive]=useState<number|null>(null);
 const prefix=useId().replace(/:/g,'');
 return <div className="faq-dialogues">{items.map(([question,answer],i)=>{
  const open=active===i;
  const panelId=`${prefix}-answer-${i}`;
  return <div className={`faq-item${open?' is-open':''}`} key={question}>
   <button className="faq-question" type="button" aria-expanded={open} aria-controls={panelId} onClick={()=>setActive(open?null:i)}>
    <MessageCircle size={21} aria-hidden="true"/><span>{question}</span><b aria-hidden="true">+</b>
   </button>
   <div className="faq-answer" id={panelId} role="region" aria-label={question} aria-hidden={!open}>
    <div className="faq-answer-inner"><p>{answer}</p></div>
   </div>
  </div>;
 })}</div>;
}
