import { Fragment } from 'react'

import About from '@/components/content/About/About'

import Home from '@/components/content/Home/Home'

export default function page() {
  return (
    <Fragment>
      <Home />
      <About />
    </Fragment>
  )
}
