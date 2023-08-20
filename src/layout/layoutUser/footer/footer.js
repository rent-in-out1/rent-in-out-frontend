import React from 'react';
import { Link } from 'react-router-dom';
import LetterEmail from '../../../assets/icons/letterEmail';
import Location from '../../../assets/icons/location';
import Telephone from '../../../assets/icons/telephone';
import { Wrapper } from "../../../assets/styles/wrappers/footer";
import { Logo } from '../../../assets/styles/wrappers/navbarUser';
import ContactForm from '../../../shared/components/contactform';

const Footer = () => {
    return (
        <Wrapper>
            <footer className='bg-blue-100 w-full p-12'>
                <main className='px-8'>
                    <div>
                        <Link to={"/"}>
                            <Logo>
                                <img src="/img/LOGO.png" alt="logo" />
                                <p>rentInOut</p>
                            </Logo>
                        </Link>
                        <p className='flex items-center'><Telephone/><span className='pl-1'>+9725641124</span></p>
                        <p className='flex items-center'><LetterEmail/><span className='pl-1'>rentInOut@gmail.com</span></p>
                        <p className='flex items-center'><Location/><span className='pl-1'>King George Street, Tel Aviv</span></p>
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
                        <h2>Get in Touch</h2>
                        <ContactForm />
                    </div>
                </main>
            </footer>
        </Wrapper>
    );
};
export default Footer;
