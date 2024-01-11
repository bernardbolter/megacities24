import { useContext } from 'react'
import { MegaContext } from '@/providers/megaProvider'
import Arrow from '@/svg/Arrow'

const MegaPagination = ({ 
    linksPerPage, 
    totalLinks,
    currentLinkIndex,
    setCurrentLinkIndex
}) => {
    const [mega, setMega] = useContext(MegaContext)
    const linkNumbers = []

    for (let i = 1; i <= Math.ceil(totalLinks / linksPerPage); i++) {
        linkNumbers.push(i)
    }

    return (
        <div className="mega-pagination-container">
            <div 
                className="pagination-arrow pagination-left"
                onClick={() => currentLinkIndex !== 1 ? setCurrentLinkIndex(currentLinkIndex - 1) : null}
            >
                <Arrow />
                <Arrow />
                <Arrow />
            </div>
            {linkNumbers.map(number => {
                return (
                    <div
                        key={number}
                        className={currentLinkIndex === number ? 'pagination-number pagination-number-on' : 'pagination-number'}
                        onClick={() => setCurrentLinkIndex(number)}
                    >
                        <p>{number}</p>
                    </div>
                )
            })}
            <div
                className="pagination-arrow pagination-right"
                onClick={() => currentLinkIndex < linkNumbers.length ? setCurrentLinkIndex(currentLinkIndex + 1) : 0}
            >
                <Arrow />
                <Arrow />
                <Arrow />
            </div>
        </div>
    )
}

export default MegaPagination