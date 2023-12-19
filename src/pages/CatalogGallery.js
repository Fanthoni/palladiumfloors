import { useEffect } from "react";

function CatalogGallery(props) {
  const getTypeName = () => {
    if (props.type && props.types) {
      return props.types.find((type) => type.id === props.type).name;
    }
  };

  return (
    <div>
      <h2>
        {props.type} - {props.category}
      </h2>
    </div>
  );
}

export default CatalogGallery;
