import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from './redux/store.ts'
import {Provider} from 'react-redux'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'

const persistor = persistStore(store)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store = {store}>
      <PersistGate loading = {<span className = 'loader'></span>} persistor = {persistor}>
          <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
