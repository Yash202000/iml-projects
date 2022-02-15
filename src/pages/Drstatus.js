import React from 'react'
import Drcomp from '../components/Drcomp'

export default function Drstatus() {
  return (
    <>
    <Drcomp missing_projects='1' present_project='1' not_synchronized='1' synchronized='1' sync_errors='1' delete_project='1' />
    </>
  )
}
