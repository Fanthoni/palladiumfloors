import logo from "../assets/logo.png";
import Menu from "../components/Menu";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getCatalogs, getCatalogCategories } from "../services/api/CatalogApi";

function Catalog() {
  const [type, setType] = useState(null);
  const [category, setCategory] = useState("All Categories");
  const [categoryOptions, setCategoryOptions] = useState([]);

  const { data: catalog, isLoading, error } = useQuery("catalog", getCatalogs);

  const getCategories = async (catalogId) => {
    const data = await getCatalogCategories(catalogId);
    return data;
  };

  useEffect(() => {
    const fetchCategoryOptions = async () => {
      if (catalog) {
        setType(catalog[0].id);
      }
    };

    fetchCategoryOptions();
  }, [catalog]);

  useEffect(() => {
    const fetchCategoryOptions = async () => {
      if (type) {
        const data = await getCategories(type);
        setCategoryOptions(data);
      }
    };

    fetchCategoryOptions();
  }, [type]);

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
            types={catalog}
            setCategory={setCategory}
            category={category}
            setType={setType}
            categoryOptions={categoryOptions}
          />
        ) : (
          <SelectMobile
            type={type}
            types={catalog}
            setCategory={setCategory}
            category={category}
            setType={setType}
            categoryOptions={categoryOptions}
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

function SelectDesktop({
  types,
  category,
  setType,
  setCategory,
  categoryOptions,
}) {
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
        defaultValue={types[0].id}
        onChange={onTypeChange}
      >
        {types.map((type, index) => {
          return (
            <MenuItem key={index} value={type.id}>
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
        {categoryOptions.map((collection, index) => {
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
  margin-bottom: 20px;

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

function SelectMobile({
  type,
  types,
  setCategory,
  category,
  setType,
  categoryOptions,
}) {
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

  const onCategoryChange = (e, newValue) => {
    setCategory(e.target.innerText);
  };

  return (
    <SelectorContainer>
      {type && (
        <StyledTabs value={type} onChange={onTypeChange} variant="scrollable">
          {types.map((type, index) => {
            return <Tab label={type.name} key={index} value={type.id} />;
          })}
        </StyledTabs>
      )}
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
        {categoryOptions.map((category, index) => {
          return (
            <CategoryOption key={index} onClick={onCategoryChange}>
              {category}
            </CategoryOption>
          );
        })}
      </div>
      ;
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

export default Catalog;
