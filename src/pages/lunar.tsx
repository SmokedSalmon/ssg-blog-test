export function getStaticProps() {
    return { props: {} }
}

function Lunar() {
    return (
        <>
            <div className='fonts-load'>
                <div style={{ fontFamily:'maisonneue-demi-webfont' }}>&nbsp;</div>
            </div>
            <div className='wrapper'></div>

            <script async src="/js/lunar.bundle.js?version=0.1.0"></script>
        </>
    )
}

export default Lunar