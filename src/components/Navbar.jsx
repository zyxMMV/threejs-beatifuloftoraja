import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className='header'>
      <NavLink to='/'>
        {/* <img src={logo} alt='logo' className='w-18 h-18 object-contain' /> */}
      </NavLink>
      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='/about' className={({ isActive }) => isActive ? "text-blue-600" : "text-black" }>
          Tentang Toraja
        </NavLink>
        
      </nav>
    </header>
  );
};

export default Navbar;