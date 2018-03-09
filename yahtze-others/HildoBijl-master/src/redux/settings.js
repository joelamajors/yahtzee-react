import idbKeyval from 'idb-keyval'

import firebase from '../config/firebase.js'
import { isSignedIn } from './user.js'

/*
 * First, set up the actions changing things.
 */

const actions = {
	applySetting: (setting) => (
    (dispatch, getState) => dispatch({
			type: 'ApplySetting',
			setting,
			source: 'user',
			user: getState().user,
		})
	),
	loadLocalSettings: () => (
		(dispatch) => {
			idbKeyval.keys().then(keys => {
				keys.forEach(key => idbKeyval.get(key).then(val => dispatch({
					type: 'ApplySetting',
					source: 'idb',
					setting: { [key]: val },
				})))
			})
		}
	),
	loadFirebaseSettings: () => (
		(dispatch, getState) => {
			const user = getState().user
			if (!isSignedIn(user))
				return
			firebase.database().ref('settings/' + user.uid).once('value').then((snapshot) => {
				dispatch({
					type: 'ApplySetting',
					source: 'firebase',
					setting: snapshot.val()
				})
			})
		}
	),
	showHotkeys: () => ({
		type: 'ShowHotkeys',
	}),
	hideHotkeys: () => ({
		type: 'HideHotkeys',
	}),
}
export default actions

/*
 * Second, set up the reducer applying the actions to the state.
 */

export function reducer(settings = {}, action) {
  switch (action.type) {

    case 'ApplySetting': {
			const newSetting = action.setting

			// Check if the settings are valid.
			if (!isValidSetting(newSetting))
				throw new Error(`Tried to set an invalid setting. The provided object was: ${JSON.stringify(newSetting)}`)

			// Send them over to IDB and Firebase.
			if (action.source === 'user') {
				for (var key in newSetting) {
					idbKeyval.set(key, newSetting[key])
				}
				if (isSignedIn(action.user)) {
					firebase.database().ref('settings/' + action.user.uid).update(newSetting)
				}
			}

			// If the settings came from IDB, only set the ones that didn't come from Firebase (or the user). If the settings came from Firebase or the user, overwrite any existing settings.
			if (action.source === 'idb') {
				return {
					...newSetting,
					...settings,
				}
			} else {
				return {
					...settings,
					...newSetting,
				}
			}
		}

		case 'ShowHotkeys': {
			return {
				...settings,
				showHotkeys: true,
			}
		}

		case 'HideHotkeys': {
			return {
				...settings,
				showHotkeys: false,
			}
		}

		default: {
      return settings
    }
  }
}

const defaultSettings = {
	useHotkeys: true,
	showHotkeys: false, // This one isn't saved, but is used to determine whether to show hotkeys now or not.
	showReport: 1,
	luckFeedback: false,
	choiceFeedback: false,
	scoreFeedback: false,
}

function isValidSetting(setting) {
	for (var key in setting) {
		if (setting.hasOwnProperty(key) && !defaultSettings.hasOwnProperty(key))
			return false
	}
	return true
}

/*
 * Third, set up getter functions for various useful parameters.
 */

export function getSettings(definedSettings) {
	return {
		...defaultSettings,
		...definedSettings,
	}
}
