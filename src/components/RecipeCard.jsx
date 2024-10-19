import React from 'react'
import { Search,Soup, Heart,HeartPulse } from 'lucide-react'
const RecipeCard = () => {
  return (
    <div className='flex flex-col rounded-md bg-[#ecf7d4] overflow-hidden p-3 relative'>
          <a href="#" className='relative h-32'>
            <img src="/1.jpg" alt="Recipe Image" className='w-full rounded-md h-full object-cover cursor-pointer'/>
            <div className='absolute rounded-full flex gap-1 bottom-2 left-2 bg-white items-center p-1 text-sm'>
              <Soup size={'16'}/> 4 Servings
            </div>
            <div className='absolute top-1 right-2 rounded-full p-1 bg-white cursor-pointer'>
              <Heart size={'20'} className={'hover:fill-red-600 hover:text-red-600'}/>

            </div>

          </a>

          <div className='flex mt-1'>
            <p className='font-bold tracking-wide'>Roasted Chicken</p>
          </div>
          <p className='my-2' >Turkish Kitchen</p>
          <div className='flex gap-2 mt-auto'>
            <div className='flex gap-1 bg-[#d6f497] items-center rounded-md p-1'>
              <HeartPulse size={'16'}/>
              <span className='tracking-tighter text-sm font-semibold'>Gluten-Free</span>
            </div>
            <div className='flex gap-1 bg-[#d6f497] items-center rounded-md p-1'>
              <HeartPulse size={'16'}/>
              <span className='tracking-tighter text-sm font-semibold'>Heart Healthy</span>
            </div>
          </div>

        </div>
  )
}

export default RecipeCard