import React from "react";
import "./Sidebar.scss";

function Sidebar() {
  return (
    <div className='sidebar'>
      <ul className='sidebar__list'>
        <li className='sidebar__list-item'>Dashboard</li>
        <li className='sidebar__list-item'>My Courses</li>
        <li className='sidebar__list-item'>My Learning</li>
      </ul>
    </div>
  );
}

export default Sidebar;
