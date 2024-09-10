import React from "react";
import qs from 'qs'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {setCategoryId , setPageCount , setFilters} from '../redux/slices/filterSlice'
import PizzaItems from "../component/PizzaBlock/index";
import Pagination from "../component/Pagination";
import { SearchContext } from "../App";
import { Categories } from "../component/Categories";
import Sort from "../component/Sort";
import { Skeleton } from "../component/PizzaBlock/Skeleton";


const  Home = () => {

const navigate = useNavigate();
const dispatch = useDispatch();
const isSearch = React.useRef(false);
const isMounted = React.useRef(false);

const categoryId = useSelector((state) => state.filter.categoryId);
const sortType = useSelector((state) => state.filter.sort?.sortProperty || 'rating');

const pageCount = useSelector((state) => state.filter.pageCount)


const { searchValue } = React.useContext(SearchContext)
const [items, setItems] = React.useState([]);
const [isLoading, setIsLoading] = React.useState(true);
const onClickCategory = (id) => {
    dispatch(setCategoryId(id))
   };
 
   const onChangePage = number => {
    dispatch(setPageCount(number));
   }


React.useEffect(() => {
if(window.location.search){
const params = qs.parse(window.location.search.substring(1))
 dispatch(
setFilters({
...params,
sort: params.sort || { name: "популярности", sortProperty: "rating" },
})
 );
 isSearch.current= true;
}
},[]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if(!isSearch.current){
      setIsLoading(true);
    
      const url = `https://66cc3e66a4dd3c8a71b6e262.mockapi.io/items?page=${pageCount}&limit=4${categoryId > 0 ? `&category=${categoryId}` : ''}&sortBy=${sortType}&order=desc`;
     axios
     .get(url)
     .then(res => {
       setItems(res.data);
       setIsLoading(false);
     });
    }
    isSearch.current=false;
  }, [categoryId, sortType, pageCount , searchValue ]);  

  React.useEffect(() => {
  if(isMounted.current){
    const queryString = qs.stringify({
      categoryId,
      sortType,
      pageCount,
     });
     navigate(`?${queryString}`);
  }
  isMounted.current = true;
  }, [categoryId, sortType, pageCount , searchValue ])
 

  const pizzas = items.map((obj) => <PizzaItems key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="l1">
        {isLoading ? skeletons : pizzas}
      </div>
      <Pagination value={pageCount} onPageChange={onChangePage} />
    </>
  );
}

export default  Home;
