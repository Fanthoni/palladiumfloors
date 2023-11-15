import styled from "styled-components";

function Catalog() {
  return (
    <CatalogWrapper>
      <h1>Catalog</h1>
    </CatalogWrapper>
  );
}

const CatalogWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Catalog;
