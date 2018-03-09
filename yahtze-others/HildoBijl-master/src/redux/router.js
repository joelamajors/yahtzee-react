import { push, replace, goBack } from 'redux-little-router'

export default function goTo(url, currentUrl, previous) {
	return (dispatch) => {
    // If we go away from the home page, we push. If we go to the home page, we go back. If we stay on the same level, we replace. This is to ensure that the back button on a smartphone brings us back to the home page.
    if (url === currentUrl)
      return
    if (currentUrl === '/')
      return dispatch(push(url))
    if (url === '/') {
      if (previous && previous.url === '/')
        return dispatch(goBack())
      else
        return dispatch(replace(url))
    }
    return dispatch(replace(url))
	}
}