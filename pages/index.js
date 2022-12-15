import Head from 'next/head';
import Layout from '../components/Layout';
import HomeIntro from '../components/HomeIntro';
import HomeSearchBoxes from '../components/HomeSearchBoxes';


export default function Home() {
  return (
    <Layout>
      <HomeIntro />
      <HomeSearchBoxes />
    </Layout>
  )
}