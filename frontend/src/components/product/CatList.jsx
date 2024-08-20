import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../common/Button'
import { Square2StackIcon } from '@heroicons/react/16/solid'

const CatergoryListingMenu = () => {

  const menuItems = [
    {
      id: 1,
      text: "Arts and Design"
    },
    {
      id: 1,
      text: "Beauty and Design"
    },
    {
      id: 1,
      text: "Clothing Casuals"
    }
    , {
      id: 1,
      text: "Handcrafted Jewelry"
    },
    {
      id: 1,
      text: "African Cuisines"
    },
    {
      id: 1,
      text: "Arts and Design"
    }
  ]

  const MenuListing = ({ data }) => {
    return (
      <Button variant='primary' className='border border-secondary w-2/3 m-5'>
        <Link>
            {data.text}
        </Link>
      </Button>
    )
  }

  return (
    <div className='container w-[20%] mt-5 h-[85vh] bg-primary rounded border border-gray-300'>
      <header className='flex justify-center'>
        <h1 className='flex justify-center dashed font-serif gap-4 text-2xl bg-secondary text-primary w-[240px] rounded p-2 font-bold container'>
          <Square2StackIcon className='w-5'/> 
          All Categories
        </h1>
      </header>

      {
        menuItems.map((data) => (
          <div className="flex flex-col items-center">
            <MenuListing data={data} />
          </div>
        ))
      }

    </div>
  )
}

export default CatergoryListingMenu
