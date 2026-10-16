import {siteOrigin} from '@/lib/sitePath';
import Hero from '@/components/sections/Hero';
import Solutions from '@/components/sections/Solutions';
import Configurator from '@/components/configurator/Configurator';
import {Estimate} from '@/components/sections/Engineering';
import ProcessScene from '@/components/sections/ProcessScene';
import AlbumNote from '@/components/AlbumNote';
import {faq,company} from '@/data/site';
import FAQAccordion from '@/components/FAQAccordion';
export default function Home(){return <main id="main"><Hero/><Solutions/><Configurator/><Estimate/><ProcessScene/>
 <section className="section container faq-section album-faq" id="faq"><div><p className="eyebrow">Перед заказом</p><h2>Частые<br/><em>вопросы.</em></h2><AlbumNote title="Можно начать с фото">Покажите въезд и расскажите, что хотите изменить. Точные размеры проверим на замере.</AlbumNote></div><FAQAccordion items={faq}/></section>
 <section className="closing-cta"><div className="container closing-album"><div><p className="eyebrow">Следующий шаг</p><h2>Обсудим<br/><em>ваш участок.</em></h2></div><div className="closing-note"><p>Расскажите, какие ворота нужны. Если ещё выбираете, начнём с фото и уточним условия участка.</p><a className="button light" href="#request">Подготовить запрос</a><small>Демонстрационная форма: отправка пока не подключена.</small></div></div></section>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'LocalBusiness',name:company.name,description:'Ворота, калитки и ограждения для частного дома',url:siteOrigin,areaServed:[{'@type':'AdministrativeArea',name:'Москва'},{'@type':'AdministrativeArea',name:'Московская область'}]})}}/></main>}
