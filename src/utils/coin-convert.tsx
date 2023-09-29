export function convertCentsToReais(reais: number) {
  const convert = `R$ ${(reais / 100).toFixed(2)}`
  return convert
}
