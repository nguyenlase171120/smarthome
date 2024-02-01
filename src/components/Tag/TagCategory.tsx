import CheckableTag from "antd/es/tag/CheckableTag";
import React from "react";
import './TagCategory.css'

interface Props {
    item: any,
    selectedItem: any,
    className?: string, 
    handleChange: (item: any) => void
}

const TagCategory: React.FC<Props> = ({item, selectedItem, className, handleChange}) => {
    const isChecked = selectedItem.key === item.key

    return <>
        <CheckableTag key={item.key} checked={isChecked}
        className={`category__tag ${className}`}
        onChange={() => handleChange(item)}
        >
            <img src={item.image} />
            {item.name}
        </CheckableTag>
    </>
}

export default TagCategory