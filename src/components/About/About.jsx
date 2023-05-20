
import './help.css';
import Navbar from "../../components/Navbar/navbar";


function About() {
    return (
        <>
            < Navbar />


            <div className="aboutcontainer">
                <div className="aboutimg">
                    <img src="assets\f_images\aboutus.jpg" alt="help"></img>
                </div>
                <h2 className="Abouttext">
                    We the team member of 3 Under-Graduates build this Website to satisfy the needs of the user. Several user friendly coding have also adopted to build this project. In the world where privacy is a threat we have build an open source project which will is available free to use and without any privacy issues. You will be able to connect with friends in this pandemic.
           </h2>
            </div>
        </>
    );
}
export default About;