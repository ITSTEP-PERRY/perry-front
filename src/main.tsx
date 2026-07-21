import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ConfigProvider} from "antd";
import {config} from "./theme/antdGlobalConfig.ts";
import {buttonConfig} from "./theme/antdButtonConfig.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ConfigProvider
          theme={config}
          button={buttonConfig}>
        <App />
      </ConfigProvider>
  </StrictMode>,
)
