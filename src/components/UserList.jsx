import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Styles
import '../scss/components/UserList.scss'

// Components
import Button from './Button'
import ToolTip from './ToolTip'
import Image from './Image'


function UserList({users, showBtn, showMoreHandler}) {

  return (
    <>
    <ul className="user-list">
        {!!users.length
        ? users.map((user) => 
            <li className="user-list__user-item" key={user.id}>
              <Image className="user-list__user-avatar" src={user.photo} alt="User Avatar"/>
  
              <ToolTip text={user.name} tip={user.name} className="user-list__user-name" />
              <div className='user-list__user-contacts'>
                 <ToolTip text={user.position} tip={user.position} className="user-list__user-position" />
                 <ToolTip text={user.email} tip={user.email} className="user-list__user-email" />
                 <ToolTip text={user.phone} tip={user.phone} className="user-list__user-phone" />
              </div>
            </li>
        )
      :
      <p className='user-list__empty'>There are any user cards here.</p>
      }
  </ul>
  {showBtn && <Button onClick={showMoreHandler} className="user-list__show-more" text="Show more" maxi ></Button>}
</>
  )
}

UserList.propTypes = {
  users:  PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    position_id: PropTypes.string.isRequired,
    registration_timestamp: PropTypes.number.isRequired,
    photo: PropTypes.string.isRequired,
  })),
  showBtn: PropTypes.bool,
  showMoreHandler: PropTypes.func,
}

export default UserList
