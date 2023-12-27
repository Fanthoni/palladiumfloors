import { useEffect, useState } from "react";
import styled from "styled-components";

import { getItems } from "../services/api/CatalogApi";
import testGallery from "../assets/testGallery.jpg";

function CatalogGallery(props) {
  const [typeName, setTypeName] = useState(null);
  const [itemOptions, setItemOptions] = useState([]);

  useEffect(() => {
    const name = getTypeName(props.type);
    setTypeName(name);

    const fetchItemsData = async () => {
      const data = await getItems(props.type);
      setItemOptions(data);
    };
    props.type && fetchItemsData();
  }, [props.type]);

  const getTypeName = (typId) => {
    if (props.types) {
      const name = props.types.filter((type) => type.id === props.type)[0]
        ?.name;
      return name;
    }
  };

  const getFilteredItems = () => {
    if (props.category === "All Categories") {
      return itemOptions;
    } else {
      const category = props.category;
      const filteredItems = itemOptions.filter(
        (item) => item.category === category
      );
      return filteredItems;
    }
  };

  return (
    <div>
      <h2>
        {typeName} - {props.category}
      </h2>
      <ItemsContainer>
        {getFilteredItems().map((item) => {
          return (
            <ItemCard key={item.id}>
              <img
                src={testGallery}
                alt="test"
                style={{ width: "200px", height: "200px" }}
              />
              <p>{item.description}</p>
            </ItemCard>
          );
        })}
      </ItemsContainer>
    </div>
  );
}

const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  & p {
    width: 90%;
  }
`;

export default CatalogGallery;
