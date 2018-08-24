export class Navigator {

  // Change the location state and dispatch event
  push = (to) => {
    window.history.pushState({}, '', to)
    window.dispatchEvent(new Event('pushstate'))

    // Mark current link as active
    setTimeout(() => {
      document.body.querySelectorAll('.router-link').forEach((link) => {
        link.classList[ link.pathname === to ? 'add' : 'remove' ]('active')
      })
    })
  }
}

export const navigator = new Navigator()
export default navigator
