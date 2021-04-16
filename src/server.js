import { createServer } from 'http'
import browserify from 'browserify'
import { configure } from 'literalify'
import { createFactory } from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { body as _body, div as _div, script as _script } from 'react-dom-factories'
var body = _body, div = _div, script = _script
// This is our React component, shared by server and browser thanks to browserify
var App = createFactory(require('./App'))

// A variable to store our JS, which we create when /bundle.js is first requested
var BUNDLE = null

// Just create a plain old HTTP server that responds to two endpoints ('/' and
// '/bundle.js') This would obviously work similarly with any higher level
// library (Express, etc)
createServer(function(req, res) {

  // If we hit the homepage, then we want to serve up some HTML - including the
  // server-side rendered React component(s), as well as the script tags
  // pointing to the client-side code
  if (req.url === '/') {

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
 like_user_id
    // `props` represents the data to be passed in to the React component for
    // rendering - just as you would pass data, or expose variables in
    // templates such as Jade or Handlebars.  We just use some dummy data
    // here (with some potentially dangerous values for testing), but you could
    // imagine this would be objects typically fetched async from a DB,
    // filesystem or API, depending on the logged-in user, etc.
    var props = {
      items: [
        'Item 0',
        'Item 1',
        'Item </scRIpt>\u2028',
        'Item <!--inject!-->\u2029',
      ],
    }

    // Here we're using React to render the outer body, so we just use the
    // simpler renderToStaticMarkup function, but you could use any templating
    // language (or just a string) for the outer page template
    var html = renderToStaticMarkup(body(null,

      // The actual server-side rendering of our component occurs here, and we
      // pass our data in as `props`. This div is the same one that the client
      // will "render" into on the browser from browser.js
      div({
        id: 'content',
        dangerouslySetInnerHTML: {__html: renderToString(App(props))},
      }),

      // The props should match on the client and server, so we stringify them
      // on the page to be available for access by the code run in browser.js
      // You could use any var name here as long as it's unique
      script({
        dangerouslySetInnerHTML: {__html: 'var APP_PROPS = ' + safeStringify(props) + ';'},
      }),

      // We'll load React from a CDN - you don't have to do this,
      // you can bundle it up or serve it locally if you like
      script({src: 'https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js'}),
      script({src: 'https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js'}),
      script({src: 'https://cdn.jsdelivr.net/npm/react-dom-factories@1.0.2/index.min.js'}),
      script({src: 'https://cdn.jsdelivr.net/npm/create-react-class@15.6.3/create-react-class.min.js'}),

      // Then the browser will fetch and run the browserified bundle consisting
      // of browser.js and all its dependencies.
      // We serve this from the endpoint a few lines down.
      script({src: '/bundle.js'})
    ))

    // Return the page to the browser
    res.end(html)

  // This endpoint is hit when the browser is requesting bundle.js from the page above
  } else if (req.url === '/bundle.js') {

    res.setHeader('Content-Type', 'text/javascript')

    // If we've already bundled, send the cached result
    if (BUNDLE != null) {
      return res.end(BUNDLE)
    }

    // Otherwise, invoke browserify to package up browser.js and everything it requires.
    // We also use literalify to transform our `require` statements for React
    // so that it uses the global variable (from the CDN JS file) instead of
    // bundling it up with everything else
    browserify()
      .add('./browser.js')
      .transform(configure({
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
        'react-dom-factories': 'window.ReactDOMFactories',
        'create-react-class': 'window.createReactClass',
      }))
      .bundle(function(err, buf) {
        // Now we can cache the result and serve this up each time
        BUNDLE = buf
        res.statusCode = err ? 500 : 200
        res.end(err ? err.message : BUNDLE)
      })

  // Return 404 for all other requests
  } else {
    res.statusCode = 404
    res.end()
  }

// The http server listens on port 3000
}).listen(3000, function(err) {
  if (err) throw err
  console.log('Listening on 3000...')
})


// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
  return JSON.stringify(obj)
    .replace(/<\/(script)/ig, '<\\/$1')
    .replace(/<!--/g, '<\\!--')
    .replace(/\u2028/g, '\\u2028') // Only necessary if interpreting as JS, which we do
    .replace(/\u2029/g, '\\u2029') // Ditto
}

import express from "express"
import { json, urlencoded } from "body-parser"
import cors from "cors"

const app = express();

var corsOptions = {
  origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to your application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;like_user_id

import express from 'express'

// use process.env variables to keep private variables,
require('dotenv').config()

// Express Middleware
import helmet from 'helmet' // creates headers that protect from attacks (security)
import bodyParser from 'body-parser' // turns response into usable format
import cors from 'cors'  // allows/disallows cross-site communication
import morgan from 'morgan' // logs requests

// db Connection w/ Heroku
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

// db Connection w/ localhost
var db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'crud-practice-1'
  }
});

// Controllers - aka, the db queries
import { getTableData, postTableData, putTableData, deleteTableData } from './router/controllers/main'

// App
const app = express()

// App Middleware
const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(helmet())
app.use(cors(corsOptions))
app.use(json())
app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes - Auth
app.get('/', (req, res) => res.send('hello world'))
app.get('/crud', (req, res) => getTableData(req, res, db))
app.post('/crud', (req, res) => postTableData(req, res, db))
app.put('/crud', (req, res) => putTableData(req, res, db))
app.delete('/crud', (req, res) => deleteTableData(req, res, db))

// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
})
