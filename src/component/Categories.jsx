import React from "react";

 export function Categories( {value , onClickCategory} ) { 

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

    return(
<div className="categories">
              <ul>
                {
                  categories.map((categorieName , id) =>(
                      <li 
                       key={id} onClick={()=>onClickCategory(id)} className={value === id ? 'active' : ''} >{categorieName}</li>
                  )) 
                }
              </ul>
            </div>
    );
};