import ReactDOM from 'react-dom/client'
import App from './App'
import { ProSidebarProvider } from 'react-pro-sidebar'
import { persistor, store } from './store/app/Store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<PersistGate loading={null} persistor={persistor}>
		<Provider store={store}>
			<ProSidebarProvider>
				<App />
			</ProSidebarProvider>
		</Provider>
	</PersistGate>
)
