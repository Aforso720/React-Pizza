import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";

const typeNames = ['тонкое', 'традиционное'];

function PizzaItems({ id, title, imageUrl, price, types, sizes }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items.find(obj => obj.id === id));

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const addedCount = cartItem ? cartItem.count : 0;

  const onClickToAdd = () => {
    const item = {
      id,
      title,
      imageUrl,
      price,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 1, 
    };
    console.log("Adding item:", item);
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, index) => (
              <li
                key={index}
                onClick={() => setActiveType(type)}
                className={activeType === type ? 'active' : ''}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? 'active' : ''}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button onClick={onClickToAdd} className="button button--outline button--add">
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaItems;
