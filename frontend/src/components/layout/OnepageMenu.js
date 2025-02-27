import Link from "next/link"
// import { useRouter } from "next/router"

export default function Menu() {
    // const router = useRouter()

    return (
        <>

            {/* <ul className="sub-menu">
                <Link className={router.pathname == "/" ? "active" : ""}>Home Default</Link>
                <Link className={router.pathname == "/index-2" ? "active" : ""}>Home Interior</Link>
            </ul> */}

            <ul className="navigation clearfix">
                <li className=" dropdown"><Link href="/">Home</Link>
                    <ul>
                        <li><Link href="/">Home Page One</Link></li>
                        <li><Link href="/index-2">Home Page Two</Link></li>
                        <li><Link href="/index-3">Home Page Three</Link></li>
                        <li><Link href="/onepage">OnePage Home</Link></li>
                    </ul>
                </li>
                <li><Link href="#">home</Link></li>
                <li><Link href="#">home</Link></li>
                <li><Link href="#">home</Link></li>
                <li><Link href="#">home</Link></li>
                <li><Link href="#">home</Link></li> 
            </ul>

        </>
    )
}
