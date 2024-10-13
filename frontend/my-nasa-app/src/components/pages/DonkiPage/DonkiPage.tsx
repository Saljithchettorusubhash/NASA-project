import React from 'react'
import CMEDashboard from '../../layout/CMEDashboard/CMEDashboard'
import DonkiDashboard from '../../layout/DonkiDashboard/DonkiDashboard'
import GSTDashboard from '../../layout/GSTdashBoard/GSTDashboard'
import FLRDashboard from '../../layout/FLRDashboard/FLRDashboard'


const DonkiPage = () => {
  return (
    <div>
        <DonkiDashboard/>
        <CMEDashboard/>
        <GSTDashboard/>
        <FLRDashboard/>
    </div>
  )
}

export default DonkiPage