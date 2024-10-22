import PropTypes from "prop-types";
import { useState } from "react";
import { addComma } from "../../utils/functions";

const PriceInput = ({ resultHandler, defaultPrice, idx }) => {
  const [price, setPrice] = useState(defaultPrice.toString());

  const handleInputChange = (e) => {
    const newPrice = addComma(e.target.value.replace(/,/g, ""));
    resultHandler(idx, newPrice);
    setPrice(newPrice);
  };

  return (
    <div>
      <p className="text-gray-500 py-2">入住費用(每人每晚)</p>
      <div className="flex flex-col max-w-md">
        <div className="flex">
          <p className="px-2.5 py-3.5 text-gray-600 border-2 border-gray-300 border-r-0 rounded-md rounded-r-none bg-gray-100">
            TWD
          </p>
          <input
            id="price"
            value={price}
            className="grow px-2.5 border-2 border-orange-500 rounded-md rounded-l-none"
            type="text"
            placeholder="請輸入費用"
            onChange={handleInputChange}
          />
        </div>
        <p
          className={
            price
              ? `invisible`
              : `bg-red-50 text-orange-500 font-bold p-2.5 rounded-md`
          }
        >
          不可以為空白
        </p>
        <p className="flex justify-end text-gray-500">輸入 0 表示免費</p>
      </div>
    </div>
  );
};

PriceInput.propTypes = {
  resultHandler: PropTypes.func,
  defaultPrice: PropTypes.number,
  idx: PropTypes.number,
};

export default PriceInput;
