import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ConfigProvider} from "antd";
import {config} from "./theme/antdGlobalConfig.ts";
import {buttonConfig} from "./theme/antdButtonConfig.ts";
import {Provider} from "react-redux";
import {store} from "./app/store.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <ConfigProvider
              theme={config}
              button={buttonConfig}>
            <App />
          </ConfigProvider>
      </Provider>
  </StrictMode>,
)
