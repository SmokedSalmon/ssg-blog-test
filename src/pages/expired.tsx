export function getStaticProps() {
    return { props: {} }
}

function Expired() {
    return (
        <>
            <h2 style={{ fontFamily: 'AvenirBold', margin: '2rem' }}>Sorry, the project may be expired</h2>
            <p style={{ fontFamily: 'MaisonDemiDemi', fontSize: '1.2rem' }}>For project prototype, demonstration or materials please contact me at <a href="mailto:someone@example.com">jerrysu.jie@hotmail.com</a></p>
        </>
    )
}

export default Expired