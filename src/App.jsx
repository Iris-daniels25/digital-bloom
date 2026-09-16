import CommunitySignup from './components/CommunitySignup'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Journey from './components/Journey'
import Mission from './components/Mission'
import Offerings from './components/Offerings'

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Mission />
        <Offerings />
        <Journey />
        <CommunitySignup />
      </main>
      <Footer />
    </>
  )
}

export default App
