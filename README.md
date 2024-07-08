# WEB-APP-ORZU

## Структура проекта

```markdown
├── README.md
├── components
│ └── Editor
│ ├── Editor.js
│ └── EditorConstants.js
├── package-lock.json
├── package.json
├── pages
│ ├── \_app.js
│ ├── blog
│ │ ├── [slug].js
│ │ └── create.js
│ └── index.js
├── public
│ ├── favicon.ico
│ └── vercel.svg
├── src
│ ├── assets
│ │ ├── illustrations.tsx
│ │ ├── logo.svg
│ │ └── react.svg
│ ├── components
│ │ ├── form
│ │ ├── header
│ │ └── loading
│ ├── context
│ │ ├── langContext.tsx
│ │ └── shoppingCartContext.tsx
│ ├── hooks
│ │ ├── useFetchers.tsx
│ │ └── useTelegramTheme.tsx
│ ├── localization
│ │ └── content.ts
│ ├── pages
│ │ ├── basket
│ │ ├── categories
│ │ ├── not_found
│ │ └── questions
│ ├── types
│ │ └── types.ts
│ ├── App.css
│ ├── App.tsx
│ └── main.tsx
├── styles
│ ├── Home.module.css
│ └── globals.css
├── .eslintrc.js
├── .gitignore
├── bun.lockb
├── index.html
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```

## Основные компоненты и их функции

### Корневые файлы

- `README.md`: Документация проекта
- `package.json`: Зависимости и скрипты проекта
- `vite.config.ts`: Конфигурация Vite

### Папка `src`

- `main.tsx`: Точка входа в приложение, инициализация React и контекстов
- `App.tsx`: Основной компонент, настройка роутинга

### Компоненты (`src/components`)

- `Editor/`: Компоненты для редактирования контента
- `form/`: Компоненты форм (например, LoginForm)
- `header/`: Компонент заголовка с навигацией
- `loading/`: Компоненты для отображения состояния загрузки

### Страницы (`src/pages`)

- `basket/`: Страница корзины покупок
- `categories/`: Страница категорий товаров
- `not_found/`: Страница 404
- `questions/`: Страница с вопросами
- `index.js`: Главная страница

### Контексты (`src/context`)

- `langContext.tsx`: Управление языком интерфейса
- `shoppingCartContext.tsx`: Управление корзиной покупок

### Хуки (`src/hooks`)

- `useFetchers.tsx`: Кастомный хук для HTTP-запросов
- `useTelegramTheme.tsx`: Хук для работы с темой Telegram

### Локализация (`src/localization`)

- `content.ts`: Текстовые строки на разных языках

### Стили

- `styles/`: CSS модули и глобальные стили
- `tailwind.config.js`: Конфигурация Tailwind CSS

## Основные функции

1. Многоязычность (через langContext)
2. Управление корзиной покупок (через shoppingCartContext)
3. Каталог товаров с категориями
4. Интеграция с Telegram Web App API
5. Аутентификация пользователей

## Технологии

- React с TypeScript
- Vite
- React Router
- Tailwind CSS
- Интеграция с Telegram
