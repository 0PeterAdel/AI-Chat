import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css' // <-- تأكد من وجود هذا السطر لاستيراد ملف CSS

createRoot(document.getElementById("root")!).render(<App />);
