import React from "react";
import debounce from 'lodash.debounce'
import { SearchContext } from "../App";

function Input() {
  const [value,setValue] = React.useState('');
  const { searchValue, setSearchValue } = React.useContext(SearchContext)
const inputRef= React.useRef();

  const onClickClear = () => {
  setSearchValue('');
  setValue('')
  inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str)
    },500),
    [],
  );

  const onChangeInput = (event) =>{
    setValue(event.target.value);
    updateSearchValue(event.target.value)
  }
    return(
        <div className="Search_root__up1iP">
        <svg
          className="Search_icon__ZZxi3"
          width={25}
          enableBackground="new 0 0 32 32"
          id="EditableLine"
          version="1.1"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="14"
            cy="14"
            fill="none"
            id="XMLID_42_"
            r="9"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          ></circle>
          <line
            fill="none"
            id="XMLID_44_"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
            x1="27"
            x2="20.366"
            y1="27"
            y2="20.366"
          ></line>
        </svg>
        <input
        ref={inputRef}
        value={value}
          className="Search_input__IgxpJ"
          placeholder="Поиск пиццы..."
          onChange={onChangeInput}
        />
        {value && ( 
            <svg  onClick={onClickClear}className="repeat" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M13.292,12L21.774,1.633c.35-.427,.286-1.057-.142-1.407-.428-.348-1.057-.287-1.407,.142L12,10.421,3.774,.367c-.351-.429-.98-.49-1.407-.142-.428,.351-.491,.98-.142,1.407L10.708,12,2.226,22.367c-.35,.427-.286,1.057,.142,1.407,.425,.348,1.056,.288,1.407-.142L12,13.579l8.226,10.053c.351,.43,.982,.489,1.407,.142,.428-.351,.491-.98,.142-1.407L13.292,12Z"/></svg>)
        }
       
      </div>
    );
};

export default Input;