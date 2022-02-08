import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { PrivateRoute, UnauthRoute } from './components/routes'
import GlobalStyles from './utils/global-styles'
import { darkTheme, lightTheme } from './utils/theme'
import { useTheme } from './store/themeContext'
import { AuthProvider } from './store/authContext'
import Landing from './components/landing/Landing'
import {
  LoginPage,
  MainPage,
  NotFoundPage,
  SignupPage,
  TaskPage,
  Oauth2Page,
} from './pages'

import 'react-toastify/dist/ReactToastify.css'
import 'regenerator-runtime/runtime';
import PropTypes from 'prop-types';
import Big from 'big.js';

function App(
  { contract, currentUser, nearConfig, wallet }
) {
  const [theme] = useTheme()
  console.log(wallet, nearConfig)

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <AuthProvider>
        <GlobalStyles />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={() => <Landing wallet={wallet} nearConfig={nearConfig} currentUser={currentUser} contract={contract} />} />
            <PrivateRoute exact path="/task" component={TaskPage} />
            <Route path="/not-found" component={NotFoundPage} />
            <PrivateRoute exact path="/task/:roomId" component={MainPage} />
            <Redirect to="/not-found" />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
