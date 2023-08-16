import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper } from "../../../assets/styles/wrappers/footer";
import { Logo } from '../../../assets/styles/wrappers/navbarUser';
import ContactForm from '../../../shared/components/contactform';

const Footer = () => {
    return (
        <Wrapper>
            <footer>
                <main>
                    <div>
                        <Link to={"/"}>
                            <Logo>
                                <img src="/img/LOGO.png" alt="logo" />
                                <p>rentInOut</p>
                            </Logo>
                        </Link>
                        <p><i className="fa fa-phone" aria-hidden="true"></i> +9725641124</p>
                        <p><i className="fa fa-envelope-o" aria-hidden="true"></i> rentMe@gmail.com</p>
                        <p><i className="fa fa-map-marker" aria-hidden="true"></i> KING GEORGE STREET, TEL AVIV</p>
                        <ul className='social'>
                            <li><i className="fa fa-linkedin-square" aria-hidden="true"></i></li>
                            <li><i className="fa fa-twitter" aria-hidden="true"></i></li>
                            <li><i className="fa fa-facebook" aria-hidden="true"></i></li>
                            <li><i className="fa fa-instagram" aria-hidden="true"></i></li>
                        </ul>
                        <div>© All rights reserved</div>
                    </div>
                    <div className='hidden md:block'>
                        <h3>about</h3>
                        <h3> Privacy Policy</h3>

                    </div>
                    <div className='hidden md:block'>
                        <h2> Get in Touch</h2>
                        <ContactForm />
                    </div>
                </main>
            </footer>
        </Wrapper>
    );
};
export default Footer;
