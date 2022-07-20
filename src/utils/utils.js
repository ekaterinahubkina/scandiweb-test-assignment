export const displayTextValues = (value) => {
    switch (value.toLowerCase()) {
      case "small":
        return "S";
      case "medium":
        return "M";
      case "large":
        return "L";
      case "extra large":
        return "XL";
      default:
        return value;
    }
  }