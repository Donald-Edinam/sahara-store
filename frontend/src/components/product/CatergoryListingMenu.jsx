import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Button from '../common/Button';
import { Square2StackIcon } from '@heroicons/react/16/solid';
import axios from 'axios';

const CatergoryListingMenu = ({ setQuery }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCat, setSelectedCat] = useState("0");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const list = (await axios.get("https://api.escuelajs.co/api/v1/categories")).data;
      if (list.length) {
        sessionStorage.setItem("categories", JSON.stringify(list));
        setMenuItems(list);
      }
    };

    const storedCategories = sessionStorage.getItem("categories");
    if (storedCategories) {
      setMenuItems(JSON.parse(storedCategories));
    } else {
      getCategories();
    }

    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCat(categoryParam);
      setQuery({ category: categoryParam });
    }
  }, [searchParams, setQuery]);

  const categoryHandler = (id) => {
    setSelectedCat(id);
    setSearchParams({ category: id });
    setQuery({ category: id });
  };

  return (
    <div className='container w-[20%] mt-5 h-[85vh] bg-primary rounded border border-gray-300'>
      <header className='flex justify-center'>
        <h1 className='flex justify-center dashed font-serif gap-4 text-2xl bg-secondary text-primary w-[240px] rounded p-2 font-bold container'>
          <Square2StackIcon className='w-5'/> 
          All Categories
        </h1>
      </header>

      <div className="flex flex-col items-center">
        <Button
          variant='primary'
          className={`border border-secondary w-2/3 m-5 ${selectedCat === "0" ? "active" : ""}`}
          onClick={() => categoryHandler("0")}
        >
          <Link to="#">All</Link>
        </Button>

        {menuItems.map((data) => (
          <Button
            key={data.id}
            variant='primary'
            className={`border border-secondary w-2/3 m-5 ${selectedCat === data.id.toString() ? "active" : ""}`}
            onClick={() => categoryHandler(data.id.toString())}
          >
            <Link to="#">{data.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CatergoryListingMenu;
