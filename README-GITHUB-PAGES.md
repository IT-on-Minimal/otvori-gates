# Публикация ОТВОРИ на GitHub Pages

Сайт публикуется из ветки `main` репозитория `IT-on-Minimal/otvori-gates` по адресу <https://it-on-minimal.github.io/otvori-gates/>. После каждого `git push` в `main` запускается workflow `.github/workflows/pages.yml`: он устанавливает зависимости, собирает статические страницы с префиксом `/otvori-gates`, проверяет ссылки и ресурсы и публикует `dist/client` через GitHub Actions.

Для локальной проверки нужен Node.js 22.13 или новее:

```powershell
npm ci
$env:NEXT_PUBLIC_BASE_PATH='/otvori-gates'
$env:NEXT_PUBLIC_SITE_ORIGIN='https://it-on-minimal.github.io/otvori-gates'
npm run build
node scripts/prepare-pages.mjs
node scripts/check-pages.mjs
```

В Settings → Pages → Build and deployment источником должен быть **GitHub Actions**. Папку `dist/client` в Git добавлять не нужно.

Форма в этой версии создаёт только локальный черновик: заявка и фото никуда не отправляются. Для приёма заявок потребуется отдельный сервис и подтверждённые контакты.
