import { useEffect, useState } from "react";
import styled from "styled-components";

import { getItems } from "../services/api/CatalogApi";
import testGallery from "../assets/testGallery.jpg";

function CatalogGallery({ type, types, category, withTitle }) {
  const [typeName, setTypeName] = useState(null);
  const [itemOptions, setItemOptions] = useState([]);

  useEffect(() => {
    const name = getTypeName(type);
    setTypeName(name);

    const fetchItemsData = async () => {
      const data = await getItems(type);
      setItemOptions(data);
    };
    type && fetchItemsData();
  }, [type]);

  const getTypeName = (typeSelected) => {
    if (types) {
      const name = types.filter((type) => type.id === typeSelected)[0]?.name;
      return name;
    }
  };

  const getFilteredItems = () => {
    if (category === "All Categories") {
      return itemOptions;
    } else {
      const categorySelected = category;
      const filteredItems = itemOptions.filter(
        (item) => item.category === categorySelected
      );
      return filteredItems;
    }
  };

  return (
    <GalleryContainer>
      {withTitle && (
        <h2>
          {typeName} - {category}
        </h2>
      )}
      <ItemsContainer>
        {getFilteredItems().map((item) => {
          return (
            <ItemCard key={item.id}>
              <img src={testGallery} alt="test" style={{ width: "100%" }} />
              <p>{item.description}</p>
            </ItemCard>
          );
        })}
      </ItemsContainer>
    </GalleryContainer>
  );
}

const GalleryContainer = styled.div`
  margin: 2rem;
  margin-top: 0;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 150px;
  max-width: 200px;
  cursor: pointer;

  & p {
    width: 90%;
  }
`;

export default CatalogGallery;
