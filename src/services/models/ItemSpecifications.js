import { getCatalogs } from "../api/CatalogApi";
class ItemSpec {
  static validItemTypes = [
    "MOULDING",
    "VINYL",
    "HARDWOOD",
    "LAMINATED",
    "ENGINEERED",
  ];

  static getCatalogName = async (catalogId) => {
    const catalogs = await getCatalogs();

    function getCatalogIds() {
      return catalogs.map((catalog) => catalog.id);
    }
    if (catalogs && getCatalogIds().includes(catalogId)) {
      return catalogs.filter((catalog) => catalog.id === catalogId)[0].name;
    } else {
      return null;
    }
  };

  static async getSpecs(itemType) {
    const catalogName = await this.getCatalogName(itemType);

    if (catalogName) {
      switch (catalogName.toUpperCase()) {
        case "MOULDING":
          return this.getMoudlingSpecs();
        case "VINYL":
          return this.getVinylSpecs();
        case "HARDWOOD":
          return this.getHardwoodSpecs();
        case "LAMINATED":
          return this.getLaminatedSpecs();
        case "ENGINEERED":
          return this.getEngineeredSpecs();
        default:
          return null;
      }
    }
  }

  static getMoudlingSpecs() {
    return {
      dimension: "Dimension",
      thickness: "Thickness",
      cashPrice: "Cash Price",
    };
  }

  static getVinylSpecs() {
    return {
      finish: "Finish",
      length: "Length",
      thickness: "Thickness",
      width: "Width",
      surface: "Surface",
      sfPerBox: "SF per Box",
      cashPrice: "Cash Price",
      nonCashPrice: "Non-Cash Price",
    };
  }

  static getHardwoodSpecs() {
    return {
      finish: "Finish",
      length: "Length",
      thickness: "Thickness",
      width: "Width",
      surface: "Surface",
      sfPerBox: "SF per Box",
      cashPrice: "Cash Price",
      nonCashPrice: "Non-Cash Price",
    };
  }

  static getLaminatedSpecs() {
    return {
      finish: "Finish",
      length: "Length",
      thickness: "Thickness",
      width: "Width",
      surface: "Surface",
      sfPerBox: "SF per Box",
      cashPrice: "Cash Price",
      nonCashPrice: "Non-Cash Price",
      underpadAttached: "Underpad Attached",
    };
  }

  static getEngineeredSpecs() {
    return {
      finish: "Finish",
      length: "Length",
      thickness: "Thickness",
      width: "Width",
      surface: "Surface",
      sfPerBox: "SF per Box",
      cashPrice: "Cash Price",
      veneer: "Veneer",
    };
  }
}

export default ItemSpec;
