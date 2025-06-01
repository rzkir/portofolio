import { Fragment } from 'react'

import About from '@/components/content/About/About'

import Home from '@/components/content/Home/Home'

import Youtube from '@/components/content/youtube/Youtube'

export default function page() {
  return (
    <Fragment>
      <Home />
      <About />
      <Youtube />
    </Fragment>
  )
}
