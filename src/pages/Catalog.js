import logo from "../assets/logo.png";
import Menu from "../components/Menu";
import CatalogGallery from "./CatalogGallery";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
            type={type}
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
  gap: 2rem;
`;

function SelectDesktop({
  type,
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
    <>
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
      <CatalogGallery
        type={type}
        types={types}
        category={category}
        withTitle={true}
      />
    </>
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
  cursor: pointer;

  @media (min-width: 768px) {
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
  category,
  setCategory,
  setType,
  categoryOptions,
}) {
  const divRef = useRef(null);
  const [offsetTop, setOffsetTop] = useState(0);
  const [isCategorySelected, setIsCategorySelected] = useState(false);

  useEffect(() => {
    if (divRef.current) {
      const offsetTop = divRef.current.offsetTop;
      setOffsetTop(offsetTop);
    }
  }, []);

  const getTypeName = (typeSelected) => {
    if (types) {
      const name = types.filter((type) => type.id === typeSelected)[0]?.name;
      return name;
    }
  };

  const onTypeChange = (e, newValue) => {
    setType(newValue);
  };

  const onCategoryChange = (e) => {
    setCategory(e.target.innerText);
    setIsCategorySelected(true);
  };

  const onBackEvent = (e) => {
    e.preventDefault();
    setIsCategorySelected(false);
  };

  if (!isCategorySelected) {
    return (
      <SelectorContainer>
        {type && (
          <>
            <StyledTabs
              value={type}
              onChange={onTypeChange}
              variant="scrollable"
            >
              {types.map((type, index) => {
                return <Tab label={type.name} key={index} value={type.id} />;
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
              {categoryOptions.map((category, index) => {
                return (
                  <CategoryOption key={index} onClick={onCategoryChange}>
                    {category}
                  </CategoryOption>
                );
              })}
            </div>
          </>
        )}
      </SelectorContainer>
    );
  } else {
    return (
      <>
        <GalleryContainer>
          <TitleContainer>
            <Button onClick={onBackEvent}>
              <ArrowBackIcon />
            </Button>
            <h2>
              {category} - {getTypeName(type)}
            </h2>
          </TitleContainer>
          <CatalogGallery
            type={type}
            types={types}
            category={category}
            withTitle={false}
          />
        </GalleryContainer>
      </>
    );
  }
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
  padding: 2rem;

  gap: 1em;
`;

const TitleContainer = styled.div`
  width: 90%;
  gap: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default Catalog;
