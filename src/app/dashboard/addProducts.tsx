'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface FormDataType {
  name: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  mp4File: string;
  webMFile: string;
  imageUrl1: string;
  imageUrl2: string;
  imageUrl3: string;
  imageUrl4: string;
  price: string;
  type: string;
  stock: number;
  sizes: {
    XS: number;
    S: number;
    M: number;
    L: number;
    XL: number;
    XXL: number;
  };
}

interface Response {
  message: string;
  status: string;
}

const AddProducts = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [response, setResponse] = useState<Response>();
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    description1: '',
    description2: '',
    description3: '',
    description4: '',
    mp4File: '',
    webMFile: '',
    imageUrl1: '',
    imageUrl2: '',
    imageUrl3: '',
    imageUrl4: '',
    price: '',
    type: '',
    stock: 0,
    sizes: {
      XS: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
    },
  });

  const handleAddProduct = async (e: React.SyntheticEvent) => {
    e.preventDefault;

    setIsLoading(true);
    const response = await axios.post('/api/addProduct', formData);
    setResponse(response.data);
    setIsLoading(false);

    if (response.data.status === 200) {
      toast.success(response.data.message);
    }

    if (response.data.status === 400) {
      toast.error(response.data.message);
    }

    setFormData({
      name: '',
      description1: '',
      description2: '',
      description3: '',
      description4: '',
      mp4File: '',
      webMFile: '',
      imageUrl1: '',
      imageUrl2: '',
      imageUrl3: '',
      imageUrl4: '',
      price: '',
      type: '',
      stock: 0,
      sizes: {
        XS: 0,
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
        XXL: 0,
      },
    });
  };

  const quantityOptions: JSX.Element[] = [];

  // Generate quantity options
  for (let i = 0; i <= 25; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  useEffect(() => {
    const stock = Object.values(formData.sizes).reduce(
      (acc, curr) => acc + Number(curr),
      0
    );

    setFormData({ ...formData, stock: stock });
  }, [formData.sizes]); // Only run the effect when formData.sizes changes

  const [errors, setErrors] = useState({
    name: '',
    description1: '',
    description2: '',
    description3: '',
    description4: '',
    mp4File: '',
    webMFile: '',
    imageUrl1: '',
    imageUrl2: '',
    imageUrl3: '',
    imageUrl4: '',
    price: '',
    type: '',
    stock: '',
    sizes: {
      XS: '',
      S: '',
      M: '',
      L: '',
      XL: '',
      XXL: '',
    },
  });

  return (
    <div className='flex w-full flex-col flex-wrap p-4 sm:w-1/2'>
      {/* product name */}
      <div className='w-full'>
        <label className='label'>
          <span className='label-text text-coolGray-200'>Product name</span>
        </label>
        <input
          required
          name='name'
          value={formData.name}
          placeholder='Name of the Product'
          className='peer input input-bordered mb-3 w-full bg-[rgb(30,35,42)]
      invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500'
          pattern='^.{3,}$'
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <span className='mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
          Please enter the name of the product
        </span>
      </div>
      {/* product description1 */}
      <div className='w-full'>
        <label className='label'>
          <span className='label-text text-coolGray-200'>
            Product description1
          </span>
        </label>
        <textarea
          required
          value={formData.description1}
          name='description1'
          placeholder='Description1'
          className='textarea textarea-bordered mb-3 w-full bg-[rgb(30,35,42)] text-base'
          onChange={(e) =>
            setFormData({ ...formData, description1: e.target.value })
          }
        ></textarea>
        <span className='mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
          Please enter a description of the product
        </span>
      </div>

      {/* product description2 */}
      <div className='w-full'>
        <label className='label'>
          <span className='label-text text-coolGray-200'>
            Product description2
          </span>
        </label>
        <textarea
          value={formData.description2}
          name='description2'
          placeholder='Description2'
          className='textarea textarea-bordered mb-3 w-full bg-[rgb(30,35,42)] text-base'
          onChange={(e) =>
            setFormData({ ...formData, description2: e.target.value })
          }
        ></textarea>
        <span className='mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
          Please enter a description of the product
        </span>
      </div>

      {/* product description3 */}
      <div className='w-full'>
        <label className='label'>
          <span className='label-text text-coolGray-200'>
            Product description3
          </span>
        </label>
        <textarea
          value={formData.description3}
          name='description3'
          placeholder='Description3'
          className='textarea textarea-bordered mb-3 w-full bg-[rgb(30,35,42)] text-base'
          onChange={(e) =>
            setFormData({ ...formData, description3: e.target.value })
          }
        ></textarea>
        <span className='mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
          Please enter a description of the product
        </span>
      </div>

      {/* product description4 */}
      <div className='w-full'>
        <label className='label'>
          <span className='label-text text-coolGray-200'>
            Product description4
          </span>
        </label>
        <textarea
          value={formData.description4}
          name='description4'
          placeholder='Description4'
          className='textarea textarea-bordered mb-3 w-full bg-[rgb(30,35,42)] text-base'
          onChange={(e) =>
            setFormData({ ...formData, description4: e.target.value })
          }
        ></textarea>
        <span className='mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
          Please enter a description of the product
        </span>
      </div>

      {/* video urls */}

      <div className='w-full'>
        <label className='label'>
          <span className='label-text text-coolGray-200'>Product video</span>
        </label>
        <input
          required
          name='mp4File'
          type='url'
          value={formData.mp4File}
          placeholder='mp4 file'
          className='input input-bordered mb-3 w-full bg-[rgb(30,35,42)] text-base'
          onChange={(e) =>
            setFormData({ ...formData, mp4File: e.target.value })
          }
        />
        <input
          name='webMFile'
          type='url'
          value={formData.webMFile}
          placeholder='webM file'
          className='input input-bordered mb-3 w-full bg-[rgb(30,35,42)] text-base'
          onChange={(e) =>
            setFormData({ ...formData, webMFile: e.target.value })
          }
        />
      </div>

      {/* img urls */}
      <div className='w-full'>
        <label className='label'>
          <span className='label-text text-coolGray-200'>Product image</span>
        </label>
        <input
          value={formData.imageUrl1}
          name='imageUrl1'
          type='url'
          placeholder='Image URL 1'
          className='input input-bordered mb-3 w-full bg-[rgb(30,35,42)] text-base'
          onChange={(e) =>
            setFormData({ ...formData, imageUrl1: e.target.value })
          }
        />
        <input
          value={formData.imageUrl2}
          name='imageUrl2'
          type='url'
          placeholder='Image URL 2'
          className='input input-bordered mb-3 w-full bg-[rgb(30,35,42)] text-base'
          onChange={(e) =>
            setFormData({ ...formData, imageUrl2: e.target.value })
          }
        />
        <input
          value={formData.imageUrl3}
          name='imageUrl3'
          type='url'
          placeholder='Image URL 3'
          className='input input-bordered mb-3 w-full bg-[rgb(30,35,42)] text-base'
          onChange={(e) =>
            setFormData({ ...formData, imageUrl3: e.target.value })
          }
        />
        <input
          value={formData.imageUrl4}
          name='imageUrl4'
          type='url'
          placeholder='Image URL 4'
          className='input input-bordered mb-3 w-full bg-[rgb(30,35,42)] text-base'
          onChange={(e) =>
            setFormData({ ...formData, imageUrl4: e.target.value })
          }
        />
      </div>

      {/* product sizes and quantity */}
      <label className='label'>
        <span className='label-text text-coolGray-200'>
          Product size and quantity
        </span>
      </label>
      {/* sizes */}
      <div className='mb-3 flex flex-wrap gap-3 sm:gap-0'>
        {/* XS */}
        <label className='flex  w-full gap-2 sm:w-1/3 '>
          <span className='no-animation flex w-1/2 items-center justify-center rounded-lg bg-[rgb(30,35,42)] text-coolGray-200 hover:bg-[rgb(30,35,42)] sm:w-20'>
            XS
          </span>
          <select
            name='XS'
            value={formData.sizes.XS}
            className='select select-bordered w-1/2 bg-[rgb(30,35,42)] sm:w-20'
            onChange={(e) =>
              setFormData({
                ...formData,
                sizes: {
                  XS: Number(e.target.value),
                  S: Number(formData.sizes.S),
                  M: Number(formData.sizes.M),
                  L: Number(formData.sizes.L),
                  XL: Number(formData.sizes.XL),
                  XXL: Number(formData.sizes.XXL),
                },
              })
            }
          >
            {quantityOptions}
          </select>
        </label>

        {/* S */}
        <label className=' flex  w-full gap-2 sm:w-1/3'>
          <span className='no-animation flex w-1/2 items-center justify-center rounded-lg bg-[rgb(30,35,42)] text-coolGray-200 hover:bg-[rgb(30,35,42)] sm:w-20'>
            S
          </span>
          <select
            required
            name='S'
            value={formData.sizes.S}
            className='select select-bordered w-1/2 bg-[rgb(30,35,42)] sm:w-20'
            onChange={(e) =>
              setFormData({
                ...formData,
                sizes: {
                  XS: Number(formData.sizes.XS),
                  S: Number(e.target.value),
                  M: Number(formData.sizes.M),
                  L: Number(formData.sizes.L),
                  XL: Number(formData.sizes.XL),
                  XXL: Number(formData.sizes.XXL),
                },
              })
            }
          >
            {quantityOptions}
          </select>
        </label>
        {/* M */}
        <label className=' flex  w-full gap-2 sm:w-1/3'>
          <span className='no-animation flex w-1/2 items-center justify-center rounded-lg bg-[rgb(30,35,42)] text-coolGray-200 hover:bg-[rgb(30,35,42)] sm:w-20'>
            M
          </span>
          <select
            required
            name='M'
            value={formData.sizes.M}
            className='select select-bordered w-1/2 bg-[rgb(30,35,42)] sm:w-20'
            onChange={(e) =>
              setFormData({
                ...formData,
                sizes: {
                  XS: Number(formData.sizes.XS),
                  S: Number(formData.sizes.S),
                  M: Number(e.target.value),
                  L: Number(formData.sizes.L),
                  XL: Number(formData.sizes.XL),
                  XXL: Number(formData.sizes.XXL),
                },
              })
            }
          >
            {quantityOptions}
          </select>
        </label>
      </div>
      <div className='mb-3 flex flex-wrap gap-3 sm:gap-0'>
        {/* L */}
        <label className=' flex w-full gap-2 sm:w-1/3'>
          <span className='no-animation flex w-1/2 items-center justify-center rounded-lg bg-[rgb(30,35,42)] text-coolGray-200 hover:bg-[rgb(30,35,42)] sm:w-20'>
            L
          </span>
          <select
            required
            name='L'
            value={formData.sizes.L}
            className='select select-bordered w-1/2 bg-[rgb(30,35,42)] sm:w-20'
            onChange={(e) =>
              setFormData({
                ...formData,
                sizes: {
                  XS: Number(formData.sizes.XS),
                  S: Number(formData.sizes.S),
                  M: Number(formData.sizes.M),
                  L: Number(e.target.value),
                  XL: Number(formData.sizes.XL),
                  XXL: Number(formData.sizes.XXL),
                },
              })
            }
          >
            {quantityOptions}
          </select>
        </label>
        {/* XL */}
        <label className=' flex w-full gap-2 sm:w-1/3'>
          <span className='no-animation flex w-1/2 items-center justify-center rounded-lg bg-[rgb(30,35,42)] text-coolGray-200 hover:bg-[rgb(30,35,42)] sm:w-20'>
            XL
          </span>
          <select
            required
            name='XL'
            value={formData.sizes.XL}
            className='select select-bordered w-1/2 bg-[rgb(30,35,42)] sm:w-20'
            onChange={(e) =>
              setFormData({
                ...formData,
                sizes: {
                  XS: Number(formData.sizes.XS),
                  S: Number(formData.sizes.S),
                  M: Number(formData.sizes.M),
                  L: Number(formData.sizes.L),
                  XL: Number(e.target.value),
                  XXL: Number(formData.sizes.XXL),
                },
              })
            }
          >
            {quantityOptions}
          </select>
        </label>
        {/* XXL */}
        <label className=' flex w-full gap-2 sm:w-1/3'>
          <span className='no-animation flex w-1/2 items-center justify-center rounded-lg bg-[rgb(30,35,42)] text-coolGray-200 hover:bg-[rgb(30,35,42)] sm:w-20'>
            XXL
          </span>
          <select
            required
            name='XXL'
            value={formData.sizes.XXL}
            className='select select-bordered w-1/2 bg-[rgb(30,35,42)] sm:w-20'
            onChange={(e) =>
              setFormData({
                ...formData,
                sizes: {
                  XS: Number(formData.sizes.XS),
                  S: Number(formData.sizes.S),
                  M: Number(formData.sizes.M),
                  L: Number(formData.sizes.L),
                  XL: Number(formData.sizes.XL),
                  XXL: Number(e.target.value),
                },
              })
            }
          >
            {quantityOptions}
          </select>
        </label>
      </div>

      <div className='mb-4 flex gap-4'>
        {/* product stock */}
        <div className='w-1/3'>
          <label className='label'>
            <span className='label-text text-coolGray-200'>Total stock </span>
          </label>
          <div className='input input-bordered mb-3 flex items-center justify-center bg-[rgb(30,35,42)]'>
            <span className='flex w-full justify-center text-coolGray-200'>
              {formData.stock}
            </span>
          </div>
        </div>

        {/* product type */}
        <div className='w-1/3'>
          <label className='label'>
            <span className='label-text text-coolGray-200'>Product type</span>
          </label>
          <select
            required
            name='type'
            value={formData.type}
            className='input select input-bordered  w-full bg-[rgb(30,35,42)]'
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option>Choose type</option>
            <option value='tshirt'>t-shirt</option>
            <option value='sweather'>sweater</option>
            <option value='hoodie'>hoodie</option>
            <option value='accessory'>accessory</option>
            <option value='print'>print</option>
          </select>
        </div>

        {/* product price */}
        <div className='w-1/3'>
          <label className='label'>
            <span className='label-text text-coolGray-200'>Product price</span>
          </label>
          <input
            required
            value={formData.price}
            name='price'
            placeholder='Price'
            type='number'
            className='input input-bordered mb-3 w-full bg-[rgb(30,35,42)]'
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
        </div>
      </div>

      <div
        className='btn border-none bg-sky-500 text-coolGray-100 hover:bg-sky-700'
        onClick={handleAddProduct}
      >
        {isLoading ? (
          <div>
            Adding product...{' '}
            <span className='loading-spinner loading-sm'></span>
          </div>
        ) : (
          'Add Product'
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default AddProducts;
