import styled from "styled-components";

import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery } from "react-query";
import ImageCarousel from "../components/ImageCarousel";

import ItemSpec from "../services/models/ItemSpecifications";
import { postItemThubmnail } from "../services/api/CatalogApi";

function ItemDetail({ itemData, onBackClickFn }) {
  const {
    data: specs,
    isLoading,
    error,
  } = useQuery("getSpecs", async () => {
    return await ItemSpec.getSpecs(itemData.catalogId);
  });

  const handleThumbnailUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      postItemThubmnail(itemData.id, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (event) => {
    console.log(event.target.files);
    const files = event.target.files;
  };

  return (
    <Container>
      <HeaderContainer>
        <Button onClick={onBackClickFn}>
          <ArrowBackIcon />
        </Button>
        <h2>{itemData.description}</h2>
      </HeaderContainer>
      <ContentContainer>
        <ImageCarousel />
        {/* <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            onChange={handleThumbnailUpload}
          />
          <label htmlFor="raised-button-file">
            <Button variant="raised" component="span">
              Upload Thumbnail
            </Button>
          </label>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            multiple
            onChange={handleImageUpload}
          />
          <label htmlFor="raised-button-file">
            <Button variant="raised" component="span">
              Upload Pictures
            </Button>
          </label> */}
        <SpecificationsContainer>
          <h3>Specifications</h3>
          {error && <p>Something went wrong</p>}
          {isLoading && <p>Loading...</p>}
          {specs ? <ItemSpecs fields={specs} data={itemData} /> : null}
        </SpecificationsContainer>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;

  & h2 {
    font-weight: 600;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SpecificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & h3 {
    font-weight: 400;
  }
`;

/**
 * Renders the item specifications.
 *
 * @param {Object} fields - The fields object containing the field names.
 * @param {Object} data - The data object containing the field values.
 * @returns {JSX.Element} The rendered item specifications.
 */
function ItemSpecs({ fields, data }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {Object.keys(fields).map((key, index) => {
        return data[key] ? (
          <div key={index}>
            <strong>{fields[key]}: </strong>
            <span>{data[key]}</span>
          </div>
        ) : null;
      })}
    </div>
  );
}

export default ItemDetail;
