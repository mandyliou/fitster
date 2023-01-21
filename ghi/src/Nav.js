import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">FISTER</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li>
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <div className="dropdown">
							<button
								className="btn-sm dropdown-toggle text-black"
								type="button"
								id="dropdownMenuButton1"
								data-bs-toggle="dropdown"
								aria-expanded="false">
								Logged In User
							</button>
                    <ul
                    className="dropdown-menu"
                    labelledby="dropdownMenuButton4">
                    <li className="nav-item">
                        <NavLink to="/my-profile">
                            <button className="dropdown-item-sm">My Profile </button>
                            </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/posts/new">
                            <button className="dropdown-item-sm">Create Post</button>
                            </NavLink>
                    </li>
                </ul>
              </div>
                          <div className="dropdown">
							<button
								className="btn-sm dropdown-toggle text-black"
								type="button"
								id="dropdownMenuButton1"
								data-bs-toggle="dropdown"
								aria-expanded="false">
								Not Logged In User
							</button>
                    <ul
                    className="dropdown-menu"
                    labelledby="dropdownMenuButton4">
                    <li className="nav-item">
                        <NavLink to="/new-user">
                            <button
                            className="dropdown-item-sm" >
                                New User
                            </button>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/login">
                            <button className="dropdown-item-sm" >Login </button>
                            </NavLink>
                    </li>
                </ul>
              </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
