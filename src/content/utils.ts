export function fromHtml(html: string) {
  const template = document.createElement('template')
  template.innerHTML = html.trim()
  const result = template.content.children
  return result[0]
}

export function resetAfterHotReload() {
  document.querySelectorAll('.dx').forEach((el) => el.remove())
}
