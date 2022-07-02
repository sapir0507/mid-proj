import { Container } from "react-bootstrap";
import './Search.scss';

function Search({filterResults}) {
    return ( 
    <Container className="grid">
        <div className="input-group search">
            <span className="input-group-text">Search</span>
            <input type="text" name="user id" id="userID" 
            aria-label="UserID"
            placeholder="User Name"
            className="form-control" 
            onChange={(e)=>{filterResults(e.target.value)}}/>
        </div>
        <div className="button"><input type="button" value="Add" className="btn mx-1 btn-warning" /></div>
       
    </Container>
    );
}

export default Search;