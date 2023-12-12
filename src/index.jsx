import React from 'react';
import { createRoot } from 'react-dom/client';

import Module from './module';

// создаем root
const root = createRoot(document.getElementById('root'));
// рендерим контент
root.render(<Module/>);