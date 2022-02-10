import {Redirect, Route, RouteProps} from 'react-router-dom'
import {useWallet} from '../../store/walletContext'

type Props = {component: any}

export function PrivateRoute({component: Component, ...other}: Props & RouteProps) {
  const isMember = JSON.parse(localStorage.getItem('isMember') as string) || null

  return (
    <Route
      {...other}
      render={props => (isMember ? <Component {...props} /> : <Redirect to="/" />)}
    />
  )
}

export function UnauthRoute({component: Component, ...other}: Props & RouteProps) {
  const isMember = localStorage.getItem('isMember') as string || null

  return (
    <Route
      {...other}
      render={props => (!isMember ? <Component {...props} /> : <Redirect to="/" />)}
    />
  )
}
