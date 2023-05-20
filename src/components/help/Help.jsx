
import './help.css';
import Navbar from "../../components/Navbar/navbar";

function Help() {
    return (
        <>
            < Navbar />

            <div className="helpcontainer">
                <div className="helpimg">
                    <img className="help" src="assets\f_images\help.jpg" alt="help"></img>
                </div>
                <h2 className="helpLtext">Any trouble accesing our website? <br />
                Got some suggestion to share with us? <br />
                We are always here for you. Feel free to contact
                </h2>
                <h2 className="helpemail"><span>Email Us :- </span>facepagehelp@gmail.com</h2>
                <h2 className="helpnum"><span>Call Us :- </span>+91 9999999999</h2>
            </div>
        </>
    );
}
export default Help;