import dynamic from 'next/dynamic'
import Map from '../components/Map'

// const Home = dynamic(() => import('../components/Map'), {
//   ssr: false
// })

const Home = () => <><h1>Next</h1><Map /></>

export default () => <Home />