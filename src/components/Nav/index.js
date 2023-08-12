import { useRouter } from "next/router"
import Link from "next/link"
import navStyles from './nav.module.css'

function Nav() {
    const router = useRouter()
    const pathname = router.pathname
    return(
        <ul>
            <li className={pathname === '/' ? navStyles.current : navStyles.normal}>
                <Link href="/">Home</Link>
            </li>
            <li className={pathname === '/member/1' ? navStyles.current : navStyles.normal}>
                <Link href="/member/1">Member-1</Link>
            </li>
            <li className={pathname === '/member/2' ? navStyles.current : navStyles.normal}>
                <Link href="/member/2">Member-2</Link>
            </li>
            <li className={pathname === '/member/3' ? navStyles.current : navStyles.normal}>
                <Link href="/member/3">Member-3</Link>
            </li>
            <li className={pathname === '/about' ? navStyles.current : navStyles.normal}>
                <Link href="/about">About</Link>
            </li>
        </ul>
    )
}

export default Nav
