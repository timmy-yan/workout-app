import { Link } from 'react-router-dom';

const Navbar = () => {
    return (<div className='navbar'>
        <li>
            <Link to ="/">
                Home 
            </Link>
        </li>
        <li>
            <Link to ="/workout">
                Workout
            </Link>        
        </li>
        <li>
            <Link to ="/edit">
                Edit workout 
            </Link>        
        </li>
    </div>)
};

export default Navbar;