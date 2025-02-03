import React, { useState } from "react";

const Checklist = ({ complianceChecklist }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (item) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(item)) {
        return prevCheckedItems?.filter((checkedItem) => checkedItem !== item);
      } else {
        return [...prevCheckedItems, item];
      }
    });
  };

  return (
    <div>
      <div className="unchecked-data">
        <ul>
          {complianceChecklist?.filter((item) => !checkedItems.includes(item))
            .map((item, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={false}
                    onChange={() => handleCheckboxChange(item)}
                  />
                  {item}
                </label>
              </li>
            ))}
        </ul>
      </div>

      <div className="checked-data">
        <ul>
          {checkedItems.map((item, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={true}
                  onChange={() => handleCheckboxChange(item)}
                />
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Checklist;
