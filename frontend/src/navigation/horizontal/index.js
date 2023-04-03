import { Monitor, Music, Dribbble, CreditCard } from 'react-feather'

export default [
  {
    id: 'movies',
    title: 'Movies',
    icon: <Monitor size={20} />,
    navLink: '/movies'
  },
  {
    id: 'games',
    title: 'Games',
    icon: <Dribbble size={20} />,
    navLink: '/games'
  },
  {
    id: 'songs',
    title: 'Songs',
    icon: <Music size={20} />,
    navLink: '/songs'
  },
  {
    id: 'subscription',
    title: 'Subscription',
    icon: <CreditCard size={20} />,
    navLink: '/subscription'
  }
]
