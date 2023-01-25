import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteProject } from '../../redux/slices/projectsSlice'
import ConfirmDialog from '../../components/ConfirmDialog'
import FormDialog from '../../components/FormDialog'
import ProjectForm from './ProjectForm'

import { Menu, IconButton, MenuItem } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

interface ProjMenuProps {
  projectId: string
  currentName: string
  isAdmin: boolean
  iconSize?: 'small' | 'default' | 'large'
}

const ProjMenu = ({
  projectId,
  currentName,
  isAdmin,
  iconSize,
}: ProjMenuProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleDeleteProject = () => {
    dispatch(deleteProject(projectId))
    navigate('/projects')
  }

  return (
    <div>
      <IconButton onClick={handleOpenMenu} size="small">
        <MoreHorizIcon color="primary" fontSize={iconSize || 'large'} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        marginThreshold={8}
        elevation={4}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem
          onClick={handleCloseMenu}
          component={RouterLink}
          to={`/projects/${projectId}`}
        >
          <OpenInNewIcon style={{ marginRight: '10px' }} />
          Project Details
        </MenuItem>
        {isAdmin && (
          <div>
            <FormDialog
              triggerBtn={{
                type: 'menu',
                icon: EditOutlinedIcon,
                text: 'Edit Name',
                iconStyle: { marginRight: '10px' },
                closeMenu: handleCloseMenu,
              }}
              title="Edit the project name"
            >
              <ProjectForm
                editMode="name"
                currentName={currentName}
                projectId={projectId}
              />
            </FormDialog>
            <ConfirmDialog
              title="Confirm Delete Project"
              contentText="Are you sure you want to permanently delete your project?"
              actionBtnText="Delete Project"
              triggerBtn={{
                type: 'menu',
                text: 'Delete Project',
                icon: DeleteOutlineIcon,
                iconStyle: { marginRight: '10px' },
                closeMenu: handleCloseMenu,
              }}
              actionFunc={handleDeleteProject}
            />
          </div>
        )}
      </Menu>
    </div>
  )
}

export default ProjMenu
