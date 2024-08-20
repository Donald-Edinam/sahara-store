import React from 'react'
import { Link } from 'react-router-dom'
import HeroImg from "../../assets/Hero-img-0.png"
import Button from '../common/Button'

const Hero = () => {
    return (
        <div className="hero bg-base-200 min-h-[100vh]">
            <div className="hero-content -z-2 flex-col lg:flex-row-reverse">
                <img
                    src={HeroImg}
                    width={"60%"}
                    className="max-w-md rounded-lg" />
                <div>
                    <h1 className="text-6xl font-serif font-bold">Discover Africa's Treasures</h1>
                    <p className="py-6 text-lg ">
                        Shop authentic African products from artisans across the continent. From handcrafted jewelry to vibrant textiles,
                        experience the rich diversity of African culture at your fingertips.
                    </p>
                    <Button variant="secondary" size="md">
                       <a href={"#categories"}>Shop Now</a>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Hero
