import Logo from '@/components/common/Logo'
import Nav from '@/components/common/Nav'
import SwitchLang from '@/components/common/SwitchLang'
import CountryNav from '@/components/common/CountryNav'

export default async function Prints({ params: { lng } }) {
    return (
        <main className="prints-container" >
            <Logo lng={lng} />
            <CountryNav lng={lng} /> 
            <Nav lng={lng} />
            <SwitchLang lng={lng} />
        </main>
    )
}