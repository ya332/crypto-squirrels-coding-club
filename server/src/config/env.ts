import path from 'path'
  
export const NODE_ENV = process.env['NODE_ENV'] || 'development'

// Production environment handles env variables via Heroku UI
// Development needs to load them via .env file
if (NODE_ENV !== 'production'){
  const envPath = path.resolve(__dirname + '../../../../.env');
  require('dotenv').config({path: path.resolve(envPath)})
}

export const PORT = process.env['PORT'] || 9191

export const JWT_KEY = process.env['JWT_KEY']

export const COOKIE_SECRET = process.env['COOKIE_SECRET']

export const FRONTEND_DOMAIN = process.env['FRONTEND_DOMAIN'] || 'http://localhost:3000'

export const DATABASE_URL = process.env['DATABASE_URL']

export const JDOODLE_ENDPOINT = process.env['JDOODLE_ENDPOINT']

export const JDOODLE_CLIENT_ID = process.env['JDOODLE_CLIENT_ID']

export const JDOODLE_CLIENT_SECRET = process.env['JDOODLE_CLIENT_SECRET']

export const GOOGLE_CLIENT_SECRET = process.env['GOOGLE_CLIENT_SECRET']

export const GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID']

export const GOOGLE_REDIRECT_URL = process.env['GOOGLE_REDIRECT_URL']
