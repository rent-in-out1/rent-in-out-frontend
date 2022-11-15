import React from 'react'
import { Link } from 'react-router-dom'
import { Wrapper } from "../../components/style/wrappers/footer";
import { Logo } from '../../components/style/wrappers/navbarUser';


const Footer = () => {
  return (
    <Wrapper>
      <footer>
        <div>
          <main>
            <div>
            <Link to={"/"}>
            <Logo>
              <img src="./img/LOGO.png" alt="logo" />
              <p>rentInOut</p>
            </Logo>
          </Link>
              <p><i class="fa fa-phone" aria-hidden="true"></i> +9725641124</p>
              <p><i class="fa fa-envelope-o" aria-hidden="true"></i> RentMe@gmail.com</p>
              <p><i class="fa fa-map-marker" aria-hidden="true"></i> KING GEORGE STREET, TEL AVIV</p>
              <ul className='social'>
                <li><i class="fa fa-linkedin-square" aria-hidden="true"></i></li>
                <li><i class="fa fa-twitter" aria-hidden="true"></i></li>
                <li><i class="fa fa-facebook" aria-hidden="true"></i></li>
                <li><i class="fa fa-instagram" aria-hidden="true"></i></li>
              </ul>
              <div>© All rights reserved</div>
            </div>
            <div>
              about

            </div>
            <div>
              <h2> Get in Touch</h2>
              <form>
                <input type="text" placeholder="Enter First Name" />
                <input type="text" placeholder="Enter Last Name" />
                <input type="text" placeholder="Enter your mail" />
                <input type="number" placeholder="Enter your phone" />
                <button>submit</button>
              </form>
            </div>
          </main>
        </div>
      </footer>
    </Wrapper>

  )
}

export default Footer
