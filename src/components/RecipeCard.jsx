import React, { useState } from 'react'
import { Search,Soup, Heart,HeartPulse } from 'lucide-react'

const getTwoValueFromArray=(arr)=>{
  return [arr[0],arr[1]]
}
const RecipeCard = ({recipe,bg,badge}) => {
  const healthLabels=getTwoValueFromArray(recipe.healthLabels);

  const [isFavorite, setFavorite]=useState(localStorage.getItem('favorites')?.includes(recipe.label))

  const addRecipeToFavorite=()=>{
    let favorites=JSON.parse(localStorage.getItem('favorites'))||[];
    const isRecipeAlreadyInFavorites=favorites.some((fav)=>fav.label===recipe.label);

    if(isRecipeAlreadyInFavorites){
      favorites=favorites.filter((fav)=>fav.label !==recipe.label)
      setFavorite(false)
    }
    else{
      favorites.push(recipe)
      setFavorite(true)
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
  return (
    <div className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}>
          <a 
          href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`} 
          target='_blank'
          className='relative h-32'>
            <div className='skeleton absolute inset-0'/>
            <img src={recipe.image} 
            alt="Recipe Image" 
            className='w-full rounded-md h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500'
            onLoad={(e)=>{
              e.currentTarget.style.opacity=1
              e.currentTarget.previousElementSibling.style.display="none";
            }}
            />
            <div className='absolute rounded-full flex gap-1 bottom-2 left-2 bg-white items-center p-1 text-sm'>
              <Soup size={'16'}/> {recipe.yield} Servings
            </div>
            <div className='absolute top-1 right-2 rounded-full p-1 bg-white cursor-pointer'
              onClick={(e)=>{
                e.preventDefault();
                addRecipeToFavorite()
            }}>
              {!isFavorite && <Heart size={'20'} className={'hover:fill-red-600 hover:text-red-600'}/>}
              {isFavorite && <Heart size={'20'} className={'fill-red-600 text-red-600'}/>}
              

            </div>

          </a>

          <div className='flex mt-1'>
            <p className='font-bold tracking-wide'>{recipe.label}</p>
          </div>
          <p className='my-2' >{
                recipe.cuisineType[0].charAt(0).toUpperCase()+recipe.cuisineType[0].slice(1)
                } Kitchen</p>
          <div className='flex gap-2 mt-auto'>

            {
              healthLabels.map((label,idx)=>(
                <div key={idx} className={`flex gap-1 ${badge} items-center rounded-md p-1`}>
                  <HeartPulse size={'16'}/>
                  <span className='tracking-tighter text-sm font-semibold'>{label}</span>
                </div>
              ))
            }

            {/* <div className='flex gap-1 bg-[#d6f497] items-center rounded-md p-1'>
              <HeartPulse size={'16'}/>
              <span className='tracking-tighter text-sm font-semibold'>Gluten-Free</span>
            </div>
            <div className='flex gap-1 bg-[#d6f497] items-center rounded-md p-1'>
              <HeartPulse size={'16'}/>
              <span className='tracking-tighter text-sm font-semibold'>Heart Healthy</span>
            </div> */}
          </div>

        </div>
  )
}

export default RecipeCard