export function element(node?: Node | null): node is HTMLElement {
  return node != null && node.nodeType === Node.ELEMENT_NODE;
}

export function button(el?: Node | null): el is HTMLButtonElement {
  return element(el) && el.tagName.toLowerCase() === 'button';
}

export function input(el?: Node | null): el is HTMLInputElement {
  return element(el) && el.tagName.toLowerCase() === 'input';
}
