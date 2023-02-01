import React from 'react'
import {  Helmet ,  HelmetProvider  } from 'react-helmet-async'

// assets
import logo from '../assets/images/logo.svg'


function MetaContainer(props) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>TestTask</title>
        <link rel="icon" href={logo} />
        <meta name="description" content="TestTask for position" />
        <meta property="og:title" content="TestTask ready task" />
        <meta property="og:description" content="TestTask for my new job" />
        <meta property="og:image" content={logo} />
        <meta property="og:type" content="article" />
      </Helmet>
    </HelmetProvider>
  )
}


export default MetaContainer
