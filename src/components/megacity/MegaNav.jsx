import { useState, useEffect, useCallback, useMemo, useContext } from 'react'
import { MegaContext } from '@/providers/megaProvider'
import { useWindowSize } from '@/helpers/useWindowSize'

import MegaNavLink from './MegaNavParts/MegaNavLink'
import MegaNavInfo from './MegaNavParts/MegaNavInfo'
import MegaPagination from './MegaNavParts/MegaPagination'

import EyeOpen from '@/svg/EyeOpen'
import EyeClosed from '@/svg/EyeClosed'
import Cancel from '@/svg/Cancel'

//////////////////////////////////////////////
//  MegaNav Flow ->
//  megacity[params] -> megacity redux[data]
//  nav data: megacity -> visibility -> filter -> megaImagesState
//  megaNavSate -> reorder -> visibility -> filter -> megaNavState
//
//  MegaImage Flow ->
//  megacity[params] -> get slug -> measureWindow -> decide size -> combine megaNavState -> render image component map
//  resize -> calculate position -> combine megaNavState -> render image component map
//////////////////////////////////////////////

const MegaNav = ({ megacity }) => {
    const [mega, setMega] = useContext(MegaContext)
    const size = useWindowSize()
    const [ currentLinkIndex, setCurrentLinkIndex ] = useState(1)
    const [ paginatedLinksState, setPaginatedLinksState] = useState([])

    const linksPerPage = useMemo(() => {
        var paginationHeight = size.height - 187
        if (mega.megaNavInfoOpen) {
            paginationHeight = paginationHeight - 113
        }
        if (mega.megaNavVideoOpen) {
            paginationHeight = paginationHeight - 100
        }
        return Math.ceil(paginationHeight / 34)
    }, [size.height, mega.megaNavInfoOpen, mega.megaNavVideoOpen])

    useEffect(() => {
        if (megacity.type === 'skateboarding') {
            const indexOfLastLink = currentLinkIndex * linksPerPage
            const indexOfFirstLink = indexOfLastLink - linksPerPage
            setPaginatedLinksState(mega.megaNavCities.slice(indexOfFirstLink, indexOfLastLink))
        } else {
            setPaginatedLinksState(mega.megaNavCities)
        }

        return () => null
    }, [ currentLinkIndex, mega.megaNavCities, megacity.type, linksPerPage ])

    const megaNameCallback = useCallback(node => {
        console.log(node)
        if (node !== null) {
            var elWidth = node.getBoundingClientRect().width
            const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;
            const backgroundTopMargin = map(elWidth, 74, 238, 41, 58);
            console.log(elWidth)
            console.log(backgroundTopMargin)
            setMega(state => ({
                ...state,
                megaNavWidth: elWidth + 136,
                megaNavTopMargin: backgroundTopMargin
            }))
        }
    }, [setMega])

    return (
        <section className="mega-nav" style={{ width: `${mega.megaNavWidth}px` }}>
            <div className="mega-nav-header"
                onClick={() => setMega(state => ({ ...state, megaNavOpen: !state.megaNavOpen }))}
            >
                <div className={mega.megaNavOpen 
                    ? 'mega-nav-background mega-nav-background-open' 
                    : 'mega-nav-background'}
                    style={{
                        top: mega.megaNavOpen ? -30 : -mega.megaNavTopMargin,
                        width: mega.megaNavWidth
                    }}
                />
                <div 
                    className={mega.megaNavOpen ? 'mega-nav-flag mega-nav-flag-open' : 'mega-nav-flag'}
                    style={mega.megaNavOpen ? { left: `${mega.megaNavFlagMargin}px`} : { left : '44px'}}
                >
                    <img src={`${mega.url}/flags/${megacity.flag}`} alt={`${megacity.country} Flag`} />
                    {/* {renderFlag(megacity.country, url)} */}
                </div>
                <h1 
                    ref={megaNameCallback}
                    className={mega.megaNavOpen 
                    ? 'mega-nav-name mega-nav-name-open' 
                    : 'mega-nav-name'}
                >
                    {megacity.name} {megacity.englishName ? <span>{megacity.englishName}</span> : null}
                </h1>
                <div 
                    className={mega.megaNavOpen ? "mega-nav-header-dark-background mega-nav-header-dark-background-open" : "mega-nav-header-dark-background" }
                    style={{
                        top: mega.megaNavOpen ? -30 : -mega.megaNavTopMargin,
                        width: mega.megaNavWidth
                    }}
                />
            </div>
            <div 
                className="mega-nav-body"
                style={{ 
                    left: mega.megaNavOpen ? 0 : -mega.megaNavWidth,
                    width: mega.megaNavWidth
                }}
            >
                <div 
                    className={mega.megaNavOpen ? 'mega-nav-body-dark mega-nav-body-dark-open' : 'mega-nav-body-dark'} 
                    style={{ 
                        left: mega.megaNavOpen ? 0 : -mega.megaNavWidth,
                        width: mega.megaNavWidth
                    }}
                >
                    {megacity.type === 'skateboarding' && (
                        <div className='mega-nav-search'>
                            <input
                                className='mega-nav-searchbar'
                                autoComplete="off"
                                value={mega.searchFilter}
                                onChange={e => {
                                    if (e.target.value.length > 0) {
                                        setCurrentLinkIndex(1)
                                    }
                                    setMega(state => ({ ...state, searchFilter: e.target.value }))
                                }}
                                name='megaSearchValue'
                                placeholder="search..."
                            />
                        {mega.searchFilter.length > 0 ? (
                                <div 
                                    className="mega-nav-search-params"
                                    onClick={() => {
                                        setMega(state => ({ ...state, searchFilter: '' }))
                                    }}
                                >
                                    <Close />
                                </div>  
                            ) : (
                                <div className="mega-nav-search-params">
                                    <p>{megacity.type === 'skateboarding' ? 'spot' : 'city'}</p>
                                </div> 
                            )}
                    </div>)}

                    {mega.megaNavInfoOpen && (
                        <MegaNavInfo
                            megaNavWidth={mega.megaNavWidth}
                            megacity={megacity}
                        />
                    )}

                    {mega.searchFilter.length > 0 && mega.megaNavCities.length === 0 ? (
                        <div className="no-search-container">
                            <p>Nothing Found</p>
                        </div>
                    ) : (
                        <>
                            {paginatedLinksState.map((cityInfo, index) => {
                                // console.log(paginatedLinksState)
                                return (
                                    <MegaNavLink
                                        key={index}
                                        cityInfo={cityInfo} 
                                        linkIndex={index}
                                        megaNavWidth={mega.megaNavWidth}
                                        skateboarding={megacity.type === 'skateboarding'}
                                    />
                                    )
                                }
                            )}
                        </>
                    )}
                    {megacity.type === 'skateboarding' && (
                        <MegaPagination 
                            linksPerPage={linksPerPage}
                            totalLinks={mega.megaNavCities.length}
                            currentLinkIndex={currentLinkIndex}
                            setCurrentLinkIndex={setCurrentLinkIndex}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}

export default MegaNav