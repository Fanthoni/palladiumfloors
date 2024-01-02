import styled from "styled-components";
import imageTest from "../assets/testGallery.jpg";

import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery } from "react-query";

import ItemSpec from "../services/models/ItemSpecifications";

function ItemDetail({ itemData, onBackClickFn }) {
  const {
    data: specs,
    isLoading,
    error,
  } = useQuery("getSpecs", async () => {
    return await ItemSpec.getSpecs(itemData.catalogId);
  });

  const handleImageUpload = (event) => {
    console.log(event.target.files);
    const file = event.target.files[0];
    // call API to update item thumbnail
  };

  const handleThumbnailUpload = (event) => {
    console.log(event.target.files);
    const files = event.target.files;
    // call API to update item photos
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
        <PhotoBookContainer>
          <img src={imageTest} alt="gallery" />
          <input
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
          </label>
        </PhotoBookContainer>
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
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;

  & h2 {
    font-weight: 600;
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const PhotoBookContainer = styled.div`
  width: 100%;

  & img {
    width: 100%;
  }
  text-align: center;
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
