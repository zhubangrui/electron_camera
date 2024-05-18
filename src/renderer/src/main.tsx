import './assets/main.css'

import ReactDOM from 'react-dom/client'
import App from './App'
import ConfigProvider from './common/context/config_provider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider>
    <App />
  </ConfigProvider>
)
