export function formatPopulation(population) {
  return new Intl.NumberFormat("nl-NL").format(population);
}
