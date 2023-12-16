import { useTranslation } from "@/app/i18n"

import Logo from '@/components/common/Logo'
import Nav from '@/components/common/Nav'
import SwitchLang from '@/components/common/SwitchLang'
import CountryNav from '@/components/common/CountryNav'
import AllCities from '@/components/series/AllCities'

export default async function Series({ params: { lng } }) {
    const { t } = await useTranslation(lng, ['common', 'about'])

    return (
        <main className="series-container" >
            <Logo 
                title={t('megacities')}
                tagline={t('compositeCountryPortaits')}
            />
            <CountryNav  /> 
            <Nav 
                about={t('about')}
                series={t('series')}
                prints={t('prints')}
                contact={t('contact')}
            />
            <SwitchLang />
            <AllCities />
        </main>
    )
}