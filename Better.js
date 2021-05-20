import React from 'react'

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

const getUser = () => sleep(1000).then(() => ({username: 'elmo'}))
// .then(() => null)

const AuthContext = React.createContext()
function AuthProvider({children}) {
  const [state, setState] = React.useState({
    status: 'pending',
    error: null,
    user: null,
  })
  React.useEffect(() => {
    getUser().then(
      user => setState({status: 'success', error: null, user}),
      error => setState({status: 'error', error, user: null}),
    )
  }, [])

  return (
    <AuthContext.Provider value={state}>
      {state.status === 'pending' ? (
        'Loading...'
      ) : state.status === 'error' ? (
        <div>
          Oh no
          <div>
            <pre>{state.error.message}</pre>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

function useAuthState() {
  const state = React.useContext(AuthContext)
  const isPending = state.status === 'pending'
  const isError = state.status === 'error'
  const isSuccess = state.status === 'success'
  const isAuthenticated = state.user && isSuccess
  return {
    ...state,
    isPending,
    isError,
    isSuccess,
    isAuthenticated,
  }
}

function Footer() {
  return <p>This is an awesome app!</p>
}

function Header() {
  const {user} = useAuthState()
  return <p>Hello {user.username}</p>
}

function Content() {
  const {user} = useAuthState()
  return <p>I am so happy to have you here {user.username}.</p>
}

function UnauthenticatedHeader() {
  return <p>Please login</p>
}

function UnauthenticatedContent() {
  return <p>You must login to read the message</p>
}

function UnauthenticatedApp() {
  return (
    <>
      <UnauthenticatedHeader />
      <UnauthenticatedContent />
    </>
  )
}

function AuthenticatedApp() {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  )
}

function Home() {
  const {user} = useAuthState()
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

function App() {
  return (
    <AuthProvider>
      <div>
        <h1>Hello there</h1>
        <p>Welcome to my app...</p>
        <Home />
      </div>
    </AuthProvider>
  )
}

export default App