import React from 'react';
import { createRoot } from 'react-dom/client';
// подключим шрифты
import'./index.scss';

import Module from './module';

// создаем root
const root = createRoot(document.getElementById('root'));
// рендерим контент
root.render(<Module/>);