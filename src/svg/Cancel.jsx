const Cancel = ({ navOpen }) => {
    return (
        <svg viewBox="0 0 20 20">
            <path d="M3.28249 16.7175C-0.427495 13.0075 -0.427495 6.99247 3.28249 3.28249C6.99247 -0.427495 13.0075 -0.427495 16.7175 3.28249C20.4275 6.99247 20.4275 13.0075 16.7175 16.7175C13.0075 20.4275 6.99247 20.4275 3.28249 16.7175Z" strokeLinecap="round" strokeLinejoin="round"/>
            <path className={navOpen ? "nav-cancel-cross" : "nav-cancel-cross nav-cancel-cross-off"} d="M13.5355 13.5355L6.46446 6.46448M13.5355 6.46448L6.46446 13.5355" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )  
}

export default Cancel


