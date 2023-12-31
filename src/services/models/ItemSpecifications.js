class ItemSpec {
  static validItemTypes = [
    "MOULDING",
    "VINYL",
    "HARDWOOD",
    "LAMINATED",
    "ENGINEERED",
  ];

  static getSpecs(itemType) {
    if (this.validItemTypes.includes(itemType.toUpperCase())) {
      switch (itemType.toUpperCase()) {
        case "MOULDING":
          return this.getMoudlingSpecsSpecs();
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

  static getMoudlingSpecsSpecs() {
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
