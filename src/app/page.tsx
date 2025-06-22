import { Fragment } from 'react'

import About from '@/components/content/About/About'

import Home from '@/components/content/Home/Home'

import Youtube from '@/components/content/youtube/Youtube'

import Projects from '@/components/content/projects/Projects'

import Skills from "@/components/content/skills/Skils"

import Contact from '@/components/content/contact/Contact'

export default function page() {
  return (
    <Fragment>
      <Home />
      <About />
      <Skills />
      <Youtube />
      <Projects />
      <Contact />
    </Fragment>
  )
}
