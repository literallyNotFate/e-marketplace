'use client'

import Slider from "rc-slider"
import { useState, useEffect } from "react";
import { Input } from "@/app/components/ui/Input";
import 'rc-slider/assets/index.css';
import { Button } from "@/app/components/ui/Button";

function FilterProducts({categories, items, onFilterChange, delay}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([])

    const maxPrice = Math.max(...items.map(item => item.price))
    const [priceRange, setPriceRange] = useState([0, maxPrice]);

    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('name');

    const addCategory = (category) => {
        if(!selectedCategories.includes(category)){
            setSelectedCategories(prev => ([...prev, category]))
        }     
    }
    
    const removeCategory = (category) => {
        if(selectedCategories.includes(category)){
            const removedList = selectedCategories.filter((item) => (item !== category));
            setSelectedCategories(removedList);
        }
    }

    useEffect(() => {
        const filteredProducts = items.filter((item) => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category)
            const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1]
    
            return matchesSearch && matchesCategory && matchesPrice
        })
        .sort((a, b) => {
            if (sortField === 'name') {
                return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
            } else if (sortField === 'rating') {
                return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating
            } else if (sortField === 'date') {
                return sortOrder === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt)
            }

            return 0;
        });

        onFilterChange(filteredProducts)
    }, [searchQuery, items, selectedCategories, priceRange, sortField, sortOrder])


    const handleSortChange = (field) => {
        if (field === sortField) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
          setSortField(field);
          setSortOrder('asc');
        }
      };


    const resetFilters = () => {
        setSearchQuery('')
        setSelectedCategories([])
        setPriceRange([0, maxPrice])
        setSortField('name')
        setSortOrder('asc')
    }


    return (
        <div className="w-full md:w-1/3 p-5 bg-white shadow-lg rounded-lg h-fit opacity-0 animate-fade-up" style={{animationDelay: delay, animationFillMode: "forwards"}}>
            <div className="mb-6">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="search-input">Search product</label>
                <Input id="search-input" type="text" placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}/>
            </div>

            <div className="mb-6">
                <h1 className="block text-gray-700 text-md font-bold mb-2">Sorting</h1>
                <div className="flex justify-around flex-wrap">
                    <Button 
                        className={`rounded-md bg-white ${sortField === 'name' ? 'border border-indigo-500 text-indigo-500 hover:text-indigo-500' : ''}`}
                        onClick={() => handleSortChange('name')}
                    >
                        Name <span className="font-bold text-md">{sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}</span>
                    </Button>

                    <Button 
                        className={`rounded-md bg-white ${sortField === 'rating' ? 'border border-indigo-500 text-indigo-500 hover:text-indigo-500' : ''}`}
                        onClick={() => handleSortChange('rating')}
                    >
                        Rating <span className="font-bold text-md">{sortField === 'rating' && (sortOrder === 'asc' ? '↑' : '↓')}</span>
                    </Button>

                    <Button 
                        className={`rounded-md bg-white ${sortField === 'date' ? 'border border-indigo-500 text-indigo-500 hover:text-indigo-500' : ''}`}
                        onClick={() => handleSortChange('date')}
                    >
                        Date <span className="font-bold text-md">{sortField === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}</span>
                    </Button>
                </div>
            </div>

            <div className='mb-6'>
                <span className="block text-gray-700 text-md font-bold mb-3">Select category</span>
                <div className="flex flex-row flex-wrap gap-4 md:flex-col md:gap-2">
                    {
                        categories.map((category) => (
                            <div key={category} onClick={() => selectedCategories.includes(category) ? removeCategory(category) : addCategory(category)}
                                className={`w-fit min-w-fit h-8 mx-5 hover:cursor-pointer transition-all duration-300 font-semibold ${(selectedCategories.includes(category)) ? 'border-b-4 border-indigo-500': ''}`}>
                                    <h1>{category.split("-").join(" ")}</h1>
                            </div>
                        ))
                    }
                </div>
            </div>
            
            <div className="mb-6">
                <span className="block text-gray-700 text-md font-bold mb-3">Select price range</span>
                <span className="font-semibold text-green-600">{`${priceRange[0]}$ - ${priceRange[1]}$`}</span>

                <Slider
                    range
                    min={0}
                    max={maxPrice}
                    value={priceRange}
                    style={{ marginTop: '1rem'}}
                    onChange={(value) => setPriceRange(value)}
                    trackStyle={{ backgroundColor: 'black' }}
                    handleStyle={{ borderColor: 'black', backgroundColor: 'black' }}
                />
            </div>
            
            <div>
                <Button className='text-white hover:bg-white rounded-lg' onClick={() => resetFilters()}>Reset filters</Button>
            </div>
        </div>
    )
}

export default FilterProducts