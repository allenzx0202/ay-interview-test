import { useEffect, useState } from "react";
import PriceInput from "./PriceInput";
import AgeGroupSelect from "./AgeGroupSelect";
import PropTypes from "prop-types";
import { getNumberIntervals } from "../../utils/functions";

const Index = ({ onChange }) => {
  const minAge = 0;
  const maxAge = 20;
  const defaultPrice = 0;

  const [groups, setGroups] = useState([
    {
      ageGroup: [minAge, maxAge],
      price: defaultPrice,
    },
  ]);
  const [errors, setErrors] = useState([]);
  const [isIncludeAll, setIsIncludeAll] = useState(false);

  const priceHandler = (idx, value) => {
    const prevGroups = [...groups];
    prevGroups[idx].price = value;
    setGroups(prevGroups);
  };

  const ageGroupHandler = (idx, value) => {
    const prevGroups = [...groups];
    prevGroups[idx].ageGroup = value;
    setGroups(prevGroups);
  };

  const addNewGroup = () => {
    const newGroups = {
      ageGroup: [minAge, maxAge],
      price: defaultPrice,
    };
    setGroups([...groups, newGroups]);
  };

  const removeLastGroup = () => {
    setGroups(groups.slice(0, -1));
  };

  useEffect(() => {
    const ageGroups = groups.map((group) => group.ageGroup);
    const { overlap, notInclude } = getNumberIntervals(ageGroups);
    const errorsArr = ageGroups.map((ageGroup) =>
      overlap.some((overlapAgeGroup) => {
        return (
          overlapAgeGroup[0] <= ageGroup[1] && overlapAgeGroup[1] >= ageGroup[0]
        );
      }),
    );
    setIsIncludeAll(notInclude.length === 0);
    setErrors(errorsArr);
  }, [groups]);

  onChange(groups);

  return (
    <div>
      <div className="divide-y">
        {groups.map((group, idx) => {
          return (
            <div key={idx} className="py-3">
              <div className="flex justify-between text-lg">
                <p>價格設定 - {idx + 1}</p>
                <button
                  className={
                    idx === groups.length - 1 && idx !== 0
                      ? `text-orange-500 font-black`
                      : `invisible`
                  }
                  onClick={removeLastGroup}
                >
                  ✕ 移除
                </button>
              </div>
              <div className="grid grid-flow-col gap-3">
                <AgeGroupSelect
                  resultHandler={ageGroupHandler}
                  minAge={minAge}
                  maxAge={maxAge}
                  isError={errors[idx]}
                  idx={idx}
                />
                <PriceInput
                  resultHandler={priceHandler}
                  defaultPrice={defaultPrice}
                  idx={idx}
                />
              </div>
            </div>
          );
        })}
      </div>
      {!isIncludeAll && (
        <button className="py-3 text-teal-500 font-black" onClick={addNewGroup}>
          ＋新增價格設定
        </button>
      )}
    </div>
  );
};

Index.propTypes = {
  onChange: PropTypes.func,
};

export default Index;
