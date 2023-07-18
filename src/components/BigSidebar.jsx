import { NavLink } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/BigSidebar';
import {useSelector} from 'react-redux';
import links from './Links'
import NavLinks from './NavLinks';

const BigSidebar = () => {
    const {isSideBarOpen} = useSelector((store)=>store.user)
    return (
      <Wrapper>
        <div
          className={
            isSideBarOpen
              ? "sidebar-container show-sidebar"
              : "sidebar-container"
          }
        >
          <div className="content">
            <header>Something</header>
            <NavLinks/>
          </div>
        </div>
      </Wrapper>
    );
}
export default BigSidebar;