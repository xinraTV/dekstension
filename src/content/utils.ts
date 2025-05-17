export function fromHtml(html: string) {
  const template = document.createElement('template')
  template.innerHTML = html.trim()
  const result = template.content.children
  return result[0]
}

export function getByText<T = HTMLElement>(
  selector: string,
  text: string,
  lenient = false,
) {
  return Array.from(document.querySelectorAll(selector)).find((e) =>
    lenient ? e.textContent?.includes(text) : e.textContent === text,
  ) as T | undefined
}

export function resetAfterHotReload() {
  document.querySelectorAll('.dx, .ant-modal-root').forEach((el) => el.remove())
}

export function getCookie(cname: string) {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return null
}
