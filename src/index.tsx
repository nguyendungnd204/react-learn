import { createRoot } from "react-dom/client";
import App from './App';
import 'antd/dist/reset.css';

const rootElement= document.getElementById('root');
if(rootElement)
{
    const root = createRoot(rootElement);
    root.render(<App />);
}