import cloneDeep from 'lodash.clonedeep'

import { initialState } from 'store/initialState'
import { projectActions } from 'store/actions'
import { createReducer } from 'store/reducers/utilities'

const { project } = initialState

const listProjects = (state, { data, type }) => {
  const newState = cloneDeep(state)
  newState.projects = data

  return newState
}

export const projectReducer = createReducer(project, {
  [projectActions.LIST_PROJECTS]: listProjects
})
