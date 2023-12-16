import { useTranslation } from "@/app/i18n"
import Image from 'next/image'
import globeGif from '../../../public/images/globe.gif'

import Logo from "@/components/common/Logo"
import Nav from "@/components/common/Nav"
import SwitchLang from "@/components/common/SwitchLang"
import WorldReady from '@/components/globe/world-ready'
import WrappedGlobe from "@/components/globe/GlobeWrapper"

export default async function World({ params: { lng }}) {
  const { t } = await useTranslation(lng, 'common')

  return (
    <main className="index-container">
      <Logo
        title={t('megacities')}
        tagline={t('compositeCountryPortaits')}
      />
      <Nav 
          about={t('about')}
          series={t('series')}
          prints={t('prints')}
          contact={t('contact')}
      />
      <div className="index-world-ready">
        <Image src={globeGif} alt="spinning globe loader" />
        <h2>Loading World...</h2>
      </div>
      <SwitchLang lng={lng} />
      <WrappedGlobe lng={lng} skateSpots={t('skateSpots')} population={t('population')}/>
      <WorldReady
        weAreTheWorld={t('weAreTheWorld')}
        weSkateTheWorld={t('weSkateTheWorld')}
        skateWorld={t('skateWorld')}
        megacities={t('megacities')}
      />
    </main>
  )
}