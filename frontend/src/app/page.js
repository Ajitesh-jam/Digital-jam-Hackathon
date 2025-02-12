import Layout from "../components/layout/Layout"
import About from "../components/home/About"
import Banner from "../components/home/Banner"
import Funfacts from "../components/home/Funfacts"
import News from "../components/home/News"
import Service from "../components/home/Services"
import Testimonial from "../components/home/Testimonial"
import WhyChooseUs from "../components/home/WhyChooseUs"

import Feature from "../components/home/Features"
import Team from "../components/home/Team"
import Video from "../components/home/Video"
import Process from "../components/home/Process"
import Pricing from "../components/home/Pricing"
import Subscribe from "../components/home/Subscribe"


import ProofGenerator from "../components/zkverify/proof"

export default function Home() {

    return (
        <>

            <Layout headerStyle={1} footerStyle={1}>
                <ProofGenerator></ProofGenerator>
                <Banner />
                <Feature />
                <WhyChooseUs/>
                <Funfacts />
                {/* <Service /> */}
                {/* <Funfacts /> */}
                {/* <About /> */}
                
                {/* <Team /> */}
                <Process />
                <Video />
                {/* <Testimonial /> */}
                {/* <Pricing /> */}
                <News />
                <Subscribe />
            </Layout>
        </>
    )
}