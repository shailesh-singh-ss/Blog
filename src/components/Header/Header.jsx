import React from 'react'
import { Container, LogoutBtn, Logo } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "My Posts",
        slug: "/my-posts",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
    },
  ]

  return (
    <header className='py-3 shadow bg-gray-500 sticky z-50 top-0'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <ul className=' flex ml-auto mt-2'>
            {navItems.map((itme) => 
              itme.active ? (
                <li key={itme.name}>
                  <button
                    onClick={() => navigate(itme.slug)}
                    className=' inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                    {itme.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header