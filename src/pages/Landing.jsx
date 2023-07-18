import Wrapper from "../../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <div className="box box-2 img"></div>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            laborum, esse eius cumque blanditiis aliquam.
          </p>
          <Link to='/register' className="btn btn-hero">Login/Register</Link>
        </div>
        <div className="box img main-img"></div>
      </div>
    </Wrapper>
  );
};
export default Landing;
