export const formatNumber = (value: number, digits?: number): string =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: digits ?? 2,
    maximumFractionDigits: digits ?? 2,
  });
