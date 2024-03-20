import { IonSearchbar } from "@ionic/react";
import "./Home.css";
import React, { useEffect, useState } from "react";
import PackageCard from "../../components/Card/PackageCard";
import TagCategory from "../../components/Tag/TagCategory";

const Home: React.FC = () => {
  const lstData = [
    {
      key: 1,
      tagID: 1,
      tageName: "Điện thoại 1",
      listPackage: [
        {
          key: 1,
          image: "https://ionicframework.com/docs/img/demos/card-media.png",
          name: "FPT Camera 1",
          price: 20000,
          desc: "Camera 1, Camera 2, Camera 3",
        },
        {
          key: 2,
          image: "https://ionicframework.com/docs/img/demos/card-media.png",
          name: "FPT Camera 2",
          price: 20000,
          desc: "Camera 1, Camera 2, Camera 3",
        },
        {
          key: 3,
          image: "https://ionicframework.com/docs/img/demos/card-media.png",
          name: "FPT Camera 3",
          price: 20000,
          desc: "Camera 1, Camera 2, Camera 3",
        },
      ],
    },
    {
      key: 2,
      tagID: 2,
      tageName: "Điện thoại 2",
      listPackage: [
        {
          key: 1,
          image: "https://ionicframework.com/docs/img/demos/card-media.png",
          name: "FPT Camera 1",
          price: 20000,
          desc: "Camera 1, Camera 2, Camera 3",
        },
        {
          key: 2,
          image: "https://ionicframework.com/docs/img/demos/card-media.png",
          name: "FPT Camera 2",
          price: 20000,
          desc: "Camera 1, Camera 2, Camera 3",
        },
        {
          key: 3,
          image: "https://ionicframework.com/docs/img/demos/card-media.png",
          name: "FPT Camera 3",
          price: 20000,
          desc: "Camera 1, Camera 2, Camera 3",
        },
      ],
    },
  ];
  const lstTag = [
    {
      key: 1,
      name: "Điện thoại 1",
      image: "https://ionicframework.com/docs/img/demos/card-media.png",
    },
    {
      key: 2,
      name: "Điện thoại 2",
      image: "https://ionicframework.com/docs/img/demos/card-media.png",
    },
    {
      key: 3,
      name: "Điện thoại 3",
      image: "https://ionicframework.com/docs/img/demos/card-media.png",
    },
  ];

  const [lstDataResult, setLstDataResult] = useState([...lstData]);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [valueSearch, setValueSearch] = useState("");

  const handleSearch = (e: any) => {
    const value = e.target.value;
    setValueSearch(value);
  };

  const handleClickTag = (tag: any) => {
    if (tag.key == selectedItem.key) {
      setSelectedItem({});
    } else setSelectedItem(tag);
  };

  useEffect(() => {
    let lstResult = [...lstData];

    if (selectedItem && Object.keys(selectedItem).length !== 0) {
      lstResult = lstResult.filter((data) => selectedItem.key === data.key);
    }
    if (valueSearch) {
      lstResult = lstResult.map((data) => {
        return {
          ...data,
          listPackage:
            data.listPackage.filter(
              (d) =>
                d.name
                  .toLocaleLowerCase()
                  .indexOf(valueSearch.toLocaleLowerCase()) > -1
            ) || [],
        };
      });
    }

    setLstDataResult(lstResult);
  }, [valueSearch, selectedItem]);

  return (
    <div className="home-wrapper">
      <h5>Xin chào, Thành Tú!</h5>
      <div className="category__list">
        {lstTag.map((tag) => (
          <TagCategory
            item={tag}
            key={tag.key}
            handleChange={handleClickTag}
            selectedItem={selectedItem}
          />
        ))}
      </div>
      {lstDataResult.map(
        (data) =>
          data.listPackage.length > 0 && (
            <PackageCard
              lstData={data.listPackage}
              title={data.tageName}
              className="mt-25"
              key={data.key}
            />
          )
      )}
    </div>
  );
};

export default Home;
