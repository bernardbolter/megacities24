import Logo from '@/components/common/Logo'
import Nav from '@/components/common/Nav'
import SwitchLang from '@/components/common/SwitchLang'
import CountryNav from '@/components/common/CountryNav'
import AllCities from '@/components/series/AllCities'

export default async function Series({ params: { lng } }) {
    return (
        <main className="series-container" >
            <Logo lng={lng} />
            <CountryNav lng={lng} /> 
            <Nav lng={lng} />
            <SwitchLang lng={lng} />
            <AllCities lng={lng} />
        </main>
    )
}