import { Hero } from '@/components/hero/hero';
import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { OpenSource } from '@/components/sections/open-source';
import { Path } from '@/components/sections/path';
import { StackSection } from '@/components/sections/stack-section';
import { Work } from '@/components/sections/work';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <OpenSource />
        <Path />
        <StackSection />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
