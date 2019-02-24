import dynamic from 'next/dynamic'

const Home = dynamic(() => import('../components/Map'), {
  ssr: false
})

export default () => <Home />