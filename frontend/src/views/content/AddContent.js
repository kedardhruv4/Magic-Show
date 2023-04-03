import React, { useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardHeader, CardBody } from 'reactstrap'
import AddMovies from '../movies/AddMovies'
import AddGames from '../games/AddGames'
import AddSongs from '../songs/AddSongs'
const AddContent = () => {
  const [active, setActive] = useState('1')

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
  return (
    <React.Fragment>
      <Card>
        <CardHeader>Add Content</CardHeader>
        <CardBody>
          <Nav tabs>
            <NavItem>
              <NavLink
                active={active === '1'}
                onClick={() => {
                  toggle('1')
                }}
              >
                Movies
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === '2'}
                onClick={() => {
                  toggle('2')
                }}
              >
                Games
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                active={active === '3'}
                onClick={() => {
                  toggle('3')
                }}
              >
                Songs
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent className='py-50' activeTab={active}>
            <TabPane tabId='1'>
              <AddMovies />
            </TabPane>
            <TabPane tabId='2'>
              <AddGames />
            </TabPane>
            <TabPane tabId='3'>
              <AddSongs />
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default AddContent
