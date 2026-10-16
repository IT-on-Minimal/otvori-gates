import {sitePath,siteOrigin} from '@/lib/sitePath';
import type{Metadata}from'next';import'./globals.css';import'./album.css';import Header from'@/components/Header';import Footer from'@/components/Footer';
const origin=siteOrigin;
export const metadata:Metadata={metadataBase:new URL(origin),title:{default:'ОТВОРИ — ворота под ваш участок в Москве и области',template:'%s · ОТВОРИ'},description:'Подбор, изготовление и установка откатных и распашных ворот в Москве и Московской области. Внешний вид, аккуратный монтаж и удобное управление.',alternates:{canonical:siteOrigin+'/'},openGraph:{locale:'ru_RU',type:'website',title:'ОТВОРИ — ворота под ваш участок',description:'Красивый въезд. Удобно каждый день.',url:origin},icons:{icon:sitePath('/favicon.svg')}};
export default function Layout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ru"><body className="album-site"><a className="skip-link" href="#main">К содержанию</a><Header/>{children}<Footer/></body></html>}
