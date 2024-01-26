
HTMLElement.prototype.isCursorInElement = function(e:MouseEvent) : boolean {  
  const rect = this.getBoundingClientRect();
  return (e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom);
}

export {}