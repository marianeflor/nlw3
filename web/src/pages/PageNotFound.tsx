import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import logoImg from '../images/logo.svg'

import '../styles/pages/page-not-found.css'

const PageNotFound = () => {
  return (
    <div id="page-not-found">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy"/>

        <main>
          <h1>Página não encontrada.</h1>
          <p>O endereço acima pode estar errado ou fora do ar.</p>
          <Link to="/" className="go-home">
            <FiArrowLeft size={26} color="rgba(0, 0, 0, 0.6)"/>
          </Link>
        </main>

      </div>
    </div>
  )
}

export default PageNotFound
