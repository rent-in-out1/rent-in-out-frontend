import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    
    <footer class="container-fluid">
    <div class="container">
        <div class="row justify-content-between ">
          <div>
            <h2>RentInOut</h2>
            <p><i class="fa fa-phone" aria-hidden="true"></i> +9725641124</p>
            <p><i class="fa fa-envelope-o" aria-hidden="true"></i> RentMe@gmail.com</p>
            <p><i class="fa fa-map-marker" aria-hidden="true"></i> KING GEORGE STREET, TEL AVIV</p>
            <div>
            <p><i class="fa fa-linkedin-square" aria-hidden="true"></i></p>
            <p><i class="fa fa-twitter" aria-hidden="true"></i></p>
            <p><i class="fa fa-facebook" aria-hidden="true"></i></p>
            <p><i class="fa fa-instagram" aria-hidden="true"></i></p>
            </div>
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
        </div>
    </div>
</footer>

  )
}

export default Footer
