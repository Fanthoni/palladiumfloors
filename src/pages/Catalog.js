import styled from "styled-components";
import { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

const mockData = [
  {
    type: "Solid Hardwood",
    items: [
      {
        series: "Imported Walnut",
        description: "Exotic Natural Walnut",
      },
      {
        series: "Imported Walnut",
        description: "Exotic Golden Walnut",
      },
      {
        series: "Imported Walnut",
        description: "Exotic Dark Walnut",
      },
      {
        series: "Rosewood",
        description: "Santos Rosewood",
      },
    ],
  },
  {
    type: "Engineered Hardwood",
    items: [
      {
        series: "Oak",
        description: "Natural Oak",
      },
      {
        series: "Maple",
        description: "Cinnamon Maple",
      },
      {
        series: "Hickory",
        description: "Golden Hickory",
      },
      {
        series: "Birch",
        description: "Cherry Birch",
      },
    ],
  },
  {
    type: "Laminate",
    items: [
      {
        series: "Classic",
        description: "Classic Oak",
      },
      {
        series: "Elegance",
        description: "Elegant Walnut",
      },
      {
        series: "Modern",
        description: "Modern Grey",
      },
      {
        series: "Rustic",
        description: "Rustic Pine",
      },
    ],
  },
  {
    type: "Vinyl",
    items: [
      {
        series: "Luxury",
        description: "Luxury Oak",
      },
      {
        series: "Premium",
        description: "Premium Cherry",
      },
      {
        series: "Classic",
        description: "Classic Maple",
      },
      {
        series: "Rustic",
        description: "Rustic Pine",
      },
    ],
  },
  {
    type: "Moulding",
    items: [
      {
        series: "Baseboard",
        description: "Baseboard Moulding",
      },
      {
        series: "Crown",
        description: "Crown Moulding",
      },
      {
        series: "Chair Rail",
        description: "Chair Rail Moulding",
      },
      {
        series: "Shoe",
        description: "Shoe Moulding",
      },
    ],
  },
];

function getTypes() {
  const types = mockData.map((data) => data.type);
  return types;
}

function getSeries(type) {
  const items = mockData.filter((data) => data.type === type)[0].items;
  const uniqueSeries = [...new Set(items.map((item) => item.series))];
  return uniqueSeries;
}

function Catalog() {
  const [type, setType] = useState(mockData[0].type);
  const [series, setSeries] = useState("all");

  const onTypeChange = (event) => {
    setType(event.target.value);
    setSeries("all");
  };

  const onSeriesChange = (event) => {
    setSeries(event.target.value);
  };

  return (
    <Container>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="type-selector-label">Type</InputLabel>
        <Select
          labelId="type-selector-label"
          id="type-selector"
          label="Type"
          defaultValue={mockData[0].type}
          value={type}
          onChange={onTypeChange}
        >
          {getTypes().map((type) => {
            return (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="series-selector-label">Series</InputLabel>
        <Select
          labelId="series-selector-label"
          id="series-selector"
          label="Series"
          value={series}
          defaultValue={"all"}
          onChange={onSeriesChange}
        >
          <MenuItem key="all" value="all">
            All
          </MenuItem>
          {getSeries(type).map((series) => (
            <MenuItem key={series} value={series}>
              {series}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  );
}

const Container = styled.div`
  background-color: #f7f7f7;
  display: flex;
  flex-directionL row;
`;

export default Catalog;
