import { Link } from "react-router-dom";
// import img from "../assets/images/not-found.svg";


const Error = () => {
  return (
    // <Wrapper className="full-page">
      <div>
        <div className="box"></div>
        <h3>Ohh! Page Not Found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">back home</Link>
      </div>
    // </Wrapper>
  );
};
export default Error;
