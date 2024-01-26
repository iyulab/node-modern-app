function removeDashes(guid: string) {
  return guid.replace(/-/g, '');
}

function formatToGuid(value: string) {
  return value.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
}

export const Guid = {
  removeDashes,
  formatToGuid
}