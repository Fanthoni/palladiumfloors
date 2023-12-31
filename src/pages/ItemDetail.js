import styled from "styled-components";

import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ItemSpec from "../services/models/ItemSpecifications";

function ItemDetail({ itemData, onBackClickFn }) {
  return (
    <Container>
      <HeaderContainer>
        <Button onClick={onBackClickFn}>
          <ArrowBackIcon />
        </Button>
        <h2>{itemData.description}</h2>
      </HeaderContainer>
      <ContentContainer>
        <PhotoBookContainer></PhotoBookContainer>
        <SpecificationsContainer>
          <h3>Specifications</h3>
          <ItemSpecs
            fields={ItemSpec.getSpecs(itemData.catalog)}
            data={itemData}
          />
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
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const PhotoBookContainer = styled.div``;

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
