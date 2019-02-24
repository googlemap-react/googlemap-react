import dynamic from 'next/dynamic'
import Map from '../components/Map'

const Home = dynamic(() => import('../components/Map'), {
  ssr: false
})

export default () => <Home />