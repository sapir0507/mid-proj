import Container from "react-bootstrap/Container";
import './ChildPosts.scss';

function ChildPosts({postID, title, body}) {
    

    return ( <Container className="childPosts">

            <div>
                <div><span style={{marginRight: '15px'}}>Title:</span> {title}</div>
                <div> <span style={{marginRight: '15px'}}>Body:</span> {body}</div>
            </div>

    </Container> );
}

export default ChildPosts;