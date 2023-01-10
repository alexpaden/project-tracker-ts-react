import { Component } from 'react'
import IProjectData from '../types/project'
import ProjectService from '../services/project'

type Props = {}

type State = {
  projects: Array<IProjectData>
}

export default class ProjectList extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.retrieveTutorials = this.retrieveTutorials.bind(this)

    this.state = {
      projects: [],
    }
  }

  componentDidMount() {
    this.retrieveTutorials()
  }

  retrieveTutorials() {
    ProjectService.getAll()
      .then((response: any) => {
        this.setState({
          projects: response.data,
        })
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }

  render() {
    const { projects } = this.state

    return (
      <div className="list row">
        <div className="col-md-8"></div>
        <div className="col-md-6">
          <h4>Projects List</h4>

          <ul className="list-group">
            {projects &&
              projects.map((project: IProjectData, index: number) => (
                <li className={'list-group-item '} key={index}>
                  {project.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    )
  }
}
