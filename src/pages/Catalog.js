import logo from "../assets/logo.png";
import Menu from "../components/Menu";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getCatalogs } from "../services/api/CatalogApi";

import mouldingItems from "../data/mouldingItems.json";
import vinylItems from "../data/vinylItems.json";
import hardwoodItems from "../data/hardwoodItems.json";
import laminatedItems from "../data/laminatedItems.json";
import engineeredItems from "../data/engineeredItems.json";

const types = ["Moulding", "Vinyl", "Hardwood", "Laminated", "Engineered"];
const getItemData = (type) => {
  switch (type) {
    case "Moulding":
      return mouldingItems;
    case "Vinyl":
      return vinylItems;
    case "Hardwood":
      return hardwoodItems;
    case "Laminated":
      return laminatedItems;
    case "Engineered":
      return engineeredItems;
    default:
      return [];
  }
};
const getCategories = (type) => {
  const itemData = getItemData(type);
  const categories = Array.from(
    new Set(itemData.map((item, index) => item.category))
  );
  return categories;
};

function Catalog() {
  const [type, setType] = useState(types[0]);
  const [category, setCategory] = useState("All Categories");

  const { data: catalog, isLoading, error } = useQuery("catalog", getCatalogs);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <Container>
      <NavBarContainer>
        <span>
          <img
            src={logo}
            alt="palladium-logo"
            style={{ width: "150px", display: "block" }}
          />
        </span>
        <Menu />
      </NavBarContainer>
      <ContentContianer>
        {window.innerWidth > 768 ? (
          <SelectDesktop
            type={type}
            types={catalog}
            setCategory={setCategory}
            category={category}
            setType={setType}
          />
        ) : (
          <SelectMobile
            type={type}
            types={catalog}
            setCategory={setCategory}
            category={category}
            setType={setType}
          />
        )}
      </ContentContianer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 1rem;
  margin: 2rem;

  @media (max-width: 768px) {
    margin: 0.5rem;
  }
`;

const ContentContianer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5rem;
`;

function SelectDesktop({ type, types, category, setType, setCategory }) {
  const onTypeChange = (e) => {
    setType(e.target.value);
    setCategory("All Categories");
  };
  const onCategoryChange = (e) => {
    setCategory(e.target.textContent);
  };

  return (
    <SelectorContainer>
      <TypeSelect
        id="type-select"
        value={type}
        defaultValue={types[0].name}
        onChange={onTypeChange}
      >
        {types.map((type, index) => {
          return (
            <MenuItem key={index} value={type.name} id={type.id}>
              {type.name.toUpperCase()}
            </MenuItem>
          );
        })}
      </TypeSelect>
      <CategorySelect>
        <CategoryOption
          key="default"
          value="All Categories"
          onClick={onCategoryChange}
          className={category === "All Categories" ? "selected" : null}
        >
          All Categories
        </CategoryOption>
        {getCategories(type).map((collection, index) => {
          return (
            <CategoryOption
              key={index}
              value={collection}
              onClick={onCategoryChange}
              className={category === `${collection}` ? "selected" : null}
            >
              {collection}
            </CategoryOption>
          );
        })}
      </CategorySelect>
    </SelectorContainer>
  );
}

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 25%;
    max-width: 350px;
    min-width: 300px;
    gap: 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    display: grid;
    grid-template-row: 1fr 1fr;
  }
`;

const TypeSelect = styled(Select)`
  width: 100%;

  & .MuiSelect-outlined {
    background-color: black;
    border-radius: 0;
  }

  & .MuiSvgIcon-fontSizeMedium,
  .MuiSelect-outlined {
    color: white;
  }
`;

const CategorySelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  max-height: 500px;
  overflow-y: auto;
`;

const CategoryOption = styled.div`
  @media (min-width: 768px) {
    cursor: pointer;
    margin-left: 2rem;

    &:hover {
      transform: translateY(-5px);
      transition: transform 0.5s ease;
    }

    &:not(:hover) {
      transform: translateY(0);
      transition: transform 0.5s ease;
    }

    &.selected {
      font-weight: bold;
    }
  }

  @media (max-width: 768px) {
    margin: 2rem;
    font-size: 1rem;
  }
`;

function SelectMobile({ type, types, setCategory, category, setType }) {
  const divRef = useRef(null);
  const [offsetTop, setOffsetTop] = useState(0); // Add this line

  useEffect(() => {
    if (divRef.current) {
      const offsetTop = divRef.current.offsetTop;
      setOffsetTop(offsetTop);
    }
  }, []);

  const onTypeChange = (e, newValue) => {
    setType(newValue);
  };

  return (
    <SelectorContainer>
      <StyledTabs value={type} onChange={onTypeChange} variant="scrollable">
        {types.map((type, index) => {
          return <Tab label={type.name} key={index} value={type.name} />;
        })}
      </StyledTabs>
      <div
        ref={divRef}
        style={{
          maxHeight: `calc(100vh - ${offsetTop}px)`,
          overflowY: "auto",
          "*::WebkitScrollbar": {
            display: "none",
          },
        }}
      >
        {getCategories(type).map((category, index) => {
          return (
            <CategoryOption
              key={index}
              onClick={() => {
                console.log(category);
              }}
            >
              {category}
            </CategoryOption>
          );
        })}
      </div>
    </SelectorContainer>
  );
}

const StyledTabs = styled(Tabs)`
  & .MuiTabs-indicator {
    backgroundcolor: black;
  }

  & .Mui-selected {
    color: black;
  }
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Catalog;
