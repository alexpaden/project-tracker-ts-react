const storageKeyUser = 'bugTrackerUserKey'

interface User {
  id: string
  username: string
  token: string
}

const saveUser = (user: User) => {
  localStorage.setItem(storageKeyUser, JSON.stringify(user))
}

const loadUser = () => {
  const userKey = localStorage.getItem(storageKeyUser)

  if (userKey) {
    return JSON.parse(userKey)
  }

  return null
}

const removeUser = () => localStorage.removeItem(storageKeyUser)

const storage = { saveUser, loadUser, removeUser }

export default storage
