import {sitePath} from '@/lib/sitePath';
export default function NotFound(){return <main id="main" className="container subpage"><p className="eyebrow">404</p><h1>Этот вход<br/>ещё не открыт.</h1><p>Страница не найдена. Вернитесь к решениям для вашего участка.</p><a className="button" href={sitePath('/')}>На главную</a></main>}
