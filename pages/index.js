import Head from 'next/head';
import Layout from '../components/Layout';
import HomeIntro from '../components/Home/HomeIntro';
import HomeSearchBoxes from '../components/Home/HomeSearchBoxes';
import HomeBanners from '../components/Home/HomeBanners';


export default function Home() {
  return (
    <Layout pageClass="home">
      <HomeIntro />
      <HomeSearchBoxes />
      <HomeBanners />
    </Layout>
  )
}