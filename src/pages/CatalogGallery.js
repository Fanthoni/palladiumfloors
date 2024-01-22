import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { getItems } from "../services/api/CatalogApi";
import testGallery from "../assets/testGallery.jpg";
import ItemDetail from "./ItemDetail";

function CatalogGallery({ type, types, category, onBackCallbackFn }) {
  const [typeName, setTypeName] = useState(null);
  const [itemOptions, setItemOptions] = useState([]);
  const [itemSelected, setItemSelected] = useState(null);

  useEffect(() => {
    const name = getTypeName(type);
    setTypeName(name);
    setItemSelected(null);

    const fetchItemsData = async () => {
      const data = await getItems(type);
      setItemOptions(data);
    };
    type && fetchItemsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    setItemSelected(null);
  }, [category]);

  const getTypeName = (typeSelected) => {
    if (types) {
      const name = types.filter((type) => type.id === typeSelected)[0]?.name;
      return name;
    }
  };

  const onItemClick = (itemId) => {
    const selectedItem = itemOptions.find((item) => item.id === itemId);
    setItemSelected(selectedItem);
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
  if (!itemSelected) {
    return (
      <GalleryContainer>
        <TitleContainer>
          {onBackCallbackFn && (
            <Button
              onClick={() => {
                onBackCallbackFn();
              }}
            >
              <ArrowBackIcon />
            </Button>
          )}
          <Title>
            {typeName} - {category}
          </Title>
        </TitleContainer>
        <ItemsContainer>
          {getFilteredItems().map((item) => {
            return (
              <ItemCard
                key={item.id}
                onClick={() => {
                  onItemClick(item.id);
                }}
              >
                <img src={testGallery} alt="test" style={{ width: "100%" }} />
                <p>{item.description}</p>
              </ItemCard>
            );
          })}
        </ItemsContainer>
      </GalleryContainer>
    );
  } else {
    return (
      <ItemDetail
        itemData={itemSelected}
        onBackClickFn={() => {
          setItemSelected(null);
        }}
      />
    );
  }
}

const GalleryContainer = styled.div`
  margin: 0rem;
  margin-top: 0;
`;

const TitleContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.h2`
  :root {
    --min-font-size: 16px;
    --max-font-size: 46px;
  }

  font-size: clamp(20px, 4vw, 30px);
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 120px;
  max-width: 150px;
  cursor: pointer;

  & p {
    width: 90%;
  }
`;

export default CatalogGallery;
