import { Fragment } from 'react'

import { fetchHomeContents } from '@/utils/FetchHome';

import Home from '@/components/home/Home';

import About from '@/components/about/About';

import Achievements from '@/components/achievements/Achievements';

import Youtube from '@/components/youtube/Youtube';

import Projects from '@/components/projects/Projects';

import Skills from '@/components/skills/Skils';

import Articles from '@/components/articles/Articles';

import { fetchAboutContents } from "@/utils/FetchAbout";

import { fetchYoutubeContents } from "@/utils/FetchYoutube";

import { fetchProjectsContents } from "@/utils/FetchProjects";

import { fetchSkillsContents } from "@/utils/FetchSkils";

import { fetchAchievementsContents } from "@/utils/FetchAchievements";

import { fetchArticlesContents } from "@/utils/FetchArticles"

export default async function HomePage() {
  const homeData = await fetchHomeContents();
  const aboutData = await fetchAboutContents();
  const achievementsData = await fetchAchievementsContents();
  const youtubeData = await fetchYoutubeContents();
  const projectsData = await fetchProjectsContents();
  const skillsData = await fetchSkillsContents();
  const articlesData = await fetchArticlesContents();

  return (
    <Fragment>
      <Home homeData={homeData} />
      <About aboutData={aboutData} />
      <Achievements achievementsData={achievementsData} />
      <Skills skillsData={skillsData} />
      <Projects projectsData={projectsData} />
      <Youtube youtubeData={youtubeData} />
      <Articles articlesData={articlesData} />
    </Fragment>
  );
}