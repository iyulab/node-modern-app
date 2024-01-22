declare module '*.css' {
    const content: any;
    export default content;  
}
declare module '*.css?inline' {
    const content: any;
    export default content;  
}
declare module '*.module.css' {
    const content: Record<string, string>;
    export default content;  
}

declare module '*.scss' {
    const content: any;
    export default content;  
}
declare module '*.scss?inline' {
    const content: any;
    export default content;  
}
declare module '*.module.scss?inline' {
    const content: Record<string, string>;
    export default content;  
}

declare module '*.svg' {
    const content: any;
    export default content;  
}