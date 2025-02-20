let currentHandler: React.MouseEventHandler<HTMLDivElement> = event => {}

function findMatchedParentNode(
  element: Element | null,
  matchFn: (element: Element) => boolean,
) {
  while (element && !matchFn(element)) {
    element = element.parentElement
  }
  return element
}
export function underlineManagerRegister(container: HTMLDivElement) {
  // console.log('reg', container)

  // 添加鼠标点击事件监听器
  currentHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    // console.log('Mouse clicked:', event.target)
    // 在这里处理鼠标点击事件

    let { target, shiftKey } = event
    if (target instanceof HTMLElement) {
      const el = findMatchedParentNode(target, el => {
        return (
          el.classList.contains('verse-no') ||
          el.classList.contains('verse-line')
        )
      })

      if (el) {
        console.log(
          'Verse No.',
          el.getAttribute('data-verse'),
          'has been clicked',
          'and shiftKey=',
          shiftKey,
        )
      }
    }
  }

  container.addEventListener(
    'click',
    currentHandler as unknown as EventListener,
  )
}

export function underlineManagerUnregister(container: HTMLDivElement) {
  // console.log('unreg', container)

  // 移除鼠标点击事件监听器
  container.removeEventListener(
    'click',
    currentHandler as unknown as EventListener,
  )
}
