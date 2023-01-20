import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { createNewProject } from '../redux/slices/projectsSlice'
import { ProjectPayload } from '../redux/types'

const MyForm = () => {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const projectData: ProjectPayload = {
      name: inputValue,
      // other properties
    }
    dispatch(createNewProject(projectData))
    setInputValue('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default connect()(MyForm)
