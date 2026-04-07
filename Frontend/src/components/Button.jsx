import { Link } from 'react-router-dom';

function Button(props) {
    return (
        <>
        <Link to={props.Link}><button className="bg-blue-300 rounded-md min-w-2/7 max-w-sm cursor-pointer">Ver Produtos</button></Link>
        </>
    )
}

export default Button