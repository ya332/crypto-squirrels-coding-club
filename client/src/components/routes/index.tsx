import {Redirect, Route, RouteProps} from 'react-router-dom'
import {useWallet} from '../../store/walletContext'

type Props = {component: any}

export function PrivateRoute({component: Component, ...other}: Props & RouteProps) {
  const { isConnected } = useWallet();

  return (
    <Route
      {...other}
      render={props => (isConnected ? <Component {...props} /> : <Redirect to="/" />)}
    />
  )
}

export function UnauthRoute({component: Component, ...other}: Props & RouteProps) {
  const { isConnected } = useWallet();

  return (
    <Route
      {...other}
      render={props => (!isConnected ? <Component {...props} /> : <Redirect to="/" />)}
    />
  )
}
