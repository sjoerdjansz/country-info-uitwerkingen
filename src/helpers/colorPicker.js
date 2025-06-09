export function colorPicker(country) {
  switch (country.toLowerCase()) {
    case "europe":
      return "europe";
    case "americas":
      return "north-america";
    case "oceania":
      return "australia";
    case "africa":
      return "africa";
    case "asia":
      return "asia";
    default:
      return "no-region";
  }
}
