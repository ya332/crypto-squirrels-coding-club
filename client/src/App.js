import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { PrivateRoute } from './components/routes'
import GlobalStyles from './utils/global-styles'
import { darkTheme, lightTheme } from './utils/theme'
import { useTheme } from './store/themeContext'
import { AuthProvider } from './store/authContext'
import { WalletProvider } from './store/walletContext';
import Landing from './components/landing/Landing'
import {
  MainPage,
  NotFoundPage,
  TaskPage,
} from './pages'

import 'react-toastify/dist/ReactToastify.css'
import 'regenerator-runtime/runtime';

function App() {
 
  const [theme] = useTheme()


  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <AuthProvider>
        <WalletProvider apiKey={process.env.REACT_APP_MINTBASE_API_KEY || ''}>
          <GlobalStyles />
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Landing} />
              <PrivateRoute exact path="/thebackyard" component={TaskPage} />
              <Route path="/not-found" component={NotFoundPage} />
              <PrivateRoute exact path="/thebackyard/:roomId" component={MainPage} />
              <Redirect to="/not-found" />
            </Switch>
          </BrowserRouter>
        </WalletProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
