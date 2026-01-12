'use client'

import Header from '../components/Header/Header'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'
import './ContactsPage.css'

const ContactsPage = () => {
  return (
    <div className="contacts-page-wrapper compact-contact-page">
      <Header />
      <main className="contacts-main-content">
      <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default ContactsPage

