export const combinePath = (...paths: string[]) => {
  return paths.map(p => p.replace(/^\/|\/$/g, '')).join('/');
}

export const URLTool = {
  combinePath,
}