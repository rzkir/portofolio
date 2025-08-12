import { Fragment, Suspense, lazy } from 'react'

import About from '@/components/content/About/About'

import Home from '@/components/content/Home/Home'

// Lazy load non-critical components
const Youtube = lazy(() => import('@/components/content/youtube/Youtube'))
const Projects = lazy(() => import('@/components/content/projects/Projects'))
const Skills = lazy(() => import('@/components/content/skills/Skils'))
const Contact = lazy(() => import('@/components/content/contact/Contact'))

// Loading fallback component
const ComponentLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="animate-pulse bg-muted rounded-lg w-full max-w-md h-64"></div>
  </div>
)

export default function page() {
  return (
    <Fragment>
      <Home />
      <About />
      <Suspense fallback={<ComponentLoader />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <Youtube />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <Contact />
      </Suspense>
    </Fragment>
  )
}
