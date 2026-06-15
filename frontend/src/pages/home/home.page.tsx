import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  Hero,
  ProjectsSection,
} from './sections'

export const HomePage = () => {
  return (
    <div className='flex flex-col gap-32 pb-32 md:gap-48 md:pb-48'>
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  )
}
