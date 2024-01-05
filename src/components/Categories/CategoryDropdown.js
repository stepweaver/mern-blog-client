/**
 * A functional component that renders a dropdown menu for selecting a category.
 * It interacts with the Redux store using React hooks such as useDispatch and useSelector.
 * The component also utilizes the Select component from the react-select library.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onChange - A function to handle the change event of the dropdown. It takes two arguments: the category name and the selected value.
 * @param {Function} props.onBlur - A function to handle the blur event of the dropdown. It takes two arguments: the category name and a boolean indicating if the dropdown was blurred.
 * @param {Object} props.value - The currently selected category value.
 * @param {string} props.error - An optional error message to display.
 * @returns {JSX.Element} The rendered CategoryDropdown component.
 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { fetchCategoriesAction } from '../../redux/slices/category/categorySlice';

const CategoryDropdown = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const category = useSelector((state) => state?.category);
  const { categoryList, loading } = category;

  const allCategories = categoryList?.map((category) => ({
    label: category?.title,
    value: category?._id
  }));

  const handleChange = (value) => {
    props.onChange('category', value);
  };

  const handleBlur = () => {
    props.onBlur('category', true);
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      {loading ? (
        <h3 className='text-base text-green-600'>Loading...</h3>
      ) : (
        <Select
          onChange={handleChange}
          onBlur={handleBlur}
          id='category'
          options={allCategories}
          value={props?.value?.label}
        />
      )}
      {props?.error && (
        <div style={{ color: 'red', marginTop: '.5rem' }}>{props?.error}</div>
      )}
    </div>
  );
};

export default CategoryDropdown;
