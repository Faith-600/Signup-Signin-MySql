import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { StarIcon } from '@heroicons/react/20/solid';
import { Radio, RadioGroup } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function ItemsDetail() {
  const { id } = useParams();
  const reviews = { href: '#', average: 4, totalCount: 117 };
 




  const { data: item, isLoading, error } = useQuery({
    queryKey: ['item', id],
    queryFn: async () => {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      return response.data;
    },
  });

  if (isLoading) {
    return <p className="Loading">Loading item details...</p>;
  }

  if (error) {
    return <p>Error fetching product details: {error?.message}</p>;
  }

  if (!item) {
    return <p>Product not found.</p>;
  }

  return (
    <div>
      {/* Image gallery */}
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8" >
        <img
          alt={item.description}
          src={item.image}
          className={"aspect-1/5 size-full object-cover sm:rounded-lg lg:aspect-aut mt-5"}
        />
       
      </div>

      {/* Product info */}
      <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {item.title}
          </h1>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <p className="text-3xl tracking-tight text-gray-900">${item.price}</p>

          {/* Reviews */}
          <div className="mt-6">
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    aria-hidden="true"
                    className={classNames(
                      reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                      'size-5 shrink-0',
                    )}
                  />
                ))}
              </div>
              <a
                href={reviews.href}
                className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {reviews.totalCount} reviews
              </a>
            </div>
          </div>

          {/* Form */}
         
      
        </div>

        {/* Details */}
        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
          <h2 className="text-sm font-medium text-gray-900">Details</h2>
          <p className="mt-4 text-sm text-gray-600">{item.description || 'No additional details available.'}</p>
        </div>
      </div>
      
    </div>
    
  );
}

export default ItemsDetail;
