import React from 'react';
import '../assets/css/Sectcompanies.css';
import '../assets/css/Section.css';
import '../assets/css/Footer.css';
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";



function Inicio() {
    return (
        <React.Fragment>
            <Navbar /> {/* Renderiza el componente Navbar */}
            <section>
                <div className="companies">
                    <p><span>Encuentra tu lugar en segundos.</span></p>
                </div>
                <div className="SectionCompanies">
                    <div className="socialIcons">
                        <a href="https://bienestar.cuc.edu.co/deporte-unicosta/"><i className="fa-solid fa-school"></i></a>
                        <a href="https://www.healthychildren.org/Spanish/healthy-living/sports/Paginas/Running.aspx"><i className="fa-solid fa-person-running"></i></a>
                        <a href="https://country.com.co/deportes/academia-de-natacion/"><i className="fa-solid fa-person-swimming"></i></a>
                        <a href="https://www.sosbici.org/"><i className="fa-solid fa-person-biking"></i></a>
                        <a href="https://centrodeajedrezquintal.com/"><i className="fa-solid fa-chess"></i></a>
                        <a href="https://recreacionydeportes.comfamiliar.com/voleibol/"><i className="fa-solid fa-volleyball"></i></a>
                    </div>
                </div>
            </section >

            <section id="aboutUs">
                <img src="https://www.cqrioja.com/wp-content/uploads/2020/06/deportistas.png.webp" alt="Bussines"></img>
                <div className="content">
                    <h4> Vive más y mejor. </h4>
                    <p className="description">
                        El deporte regular reduce el riesgo de enfermedades crónicas como la diabetes, las enfermedades cardíacas y algunos tipos de cáncer.
                    </p>
                </div>
            </section>

            <section id="aboutUsInvest">
                <div className="contentInvest">
                    <h4> Fortalece tu cuerpo y tu mente </h4>
                    <p className="descriptionInvest">
                        El deporte te ayuda a ser más fuerte, resistente y ágil, tanto física como mentalmente.
                    </p>
                </div>
                <img src="https://www.pmfarma.com/articulos/contenido/3433/image/salud%20farmacia%20deporte.png" alt="Analyzing"></img>
            </section>

            <section id="aboutUs">
                <img src="https://www.pngmart.com/files/1/People-Sport-PNG-Clipart.png" alt="Suport"></img>
                <div className="content">
                    <h4> Invierte en tu futuro. </h4>
                    <p className="description">
                        Cuidar tu salud hoy te permitirá disfrutar de una vida más plena y activa en el futuro.
                    </p>
                </div>
            </section>



            <footer>
                <div className="footer-text"></div>
                <div className="footer-list">
                    <div className="footer-list-item">
                        <h3>What We Offer</h3>
                        <ul>
                            <li>Training Programs</li>
                            <li>Facilities</li>
                        </ul>
                    </div>

                    <div className="footer-list-item">
                        <h3>Resources</h3>
                        <ul>
                            <li>Class Schedules</li>
                            <li>Workout Library</li>
                            <li>Training Tips</li>
                            <li>Success Stories</li>
                        </ul>
                    </div>

                    <div className="footer-list-item">
                        <h3>About Us</h3>
                        <ul>
                            <li>Our Mission</li>
                            <li>Meet the Team</li>
                            <li>Facility Tour</li>
                            <li>News & Events</li>
                        </ul>
                    </div>

                    <div className="footer-list-item">
                        <h3>Contact Us</h3>
                        <ul>
                            <li>Phone: 12345</li>
                            <li>Email: pepito@gmail.com</li>
                            <li>Location: Mi casa</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </React.Fragment >
    )
}

export default Inicio;