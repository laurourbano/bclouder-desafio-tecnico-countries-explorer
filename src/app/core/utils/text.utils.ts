/**
 * Normaliza texto para busca: lowercase, remove acentos e caracteres combinantes.
 */
export const normalizeText = (value: string): string =>
  value?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') || '';
