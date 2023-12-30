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
      <Logo lng={lng} />
      <Nav lng={lng} />
      <div className="index-world-ready">
        <Image src={globeGif} alt={t('spinningGlobeLoader')} />
        <h2>{t('loadingWorld')}...</h2>
      </div>
      <SwitchLang lng={lng} />
      <WrappedGlobe lng={lng} />
      <WorldReady lng={lng} />
    </main>
  )
}