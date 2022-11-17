import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { Wrapper } from "../../components/style/wrappers/footer";
import { Logo } from '../../components/style/wrappers/navbarUser';


const Footer = () => {
  const dispatch= useDispatch()
  const nav = useNavigate();
  let {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const onSub =(_dataBody) => {
    console.log(_dataBody)
  }
  return (
    <Wrapper>
      <footer>
        
          <main>
            <div>
            <Link to={"/"}>
            <Logo>
              <img src="./img/LOGO.png" alt="logo" />
              <p>rentInOut</p>
            </Logo>
          </Link>
              <p><i className="fa fa-phone" aria-hidden="true"></i> +9725641124</p>
              <p><i className="fa fa-envelope-o" aria-hidden="true"></i> RentMe@gmail.com</p>
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
            <div  className='hidden md:block'>
              <h2> Get in Touch</h2>
              <form onSubmit={handleSubmit(onSub)}>
                <div>
                <input  {...register("firstName", {
                        required: true,
                        minLength: 2,
                        maxLength: 25,
                      })} type="text" placeholder="Enter First Name" />
                      {errors.firstName && <small>Enter valid name .</small>}
                      </div>
                      <div>
                      <input
                      {...register("lastName", {
                        required: true,
                        minLength: 2,
                        maxLength: 25,
                      })}
                      type="text"
                      placeholder=" Enter Last name"
                    />
                    {errors.lastName && <small>Enter valid last name.</small>}
                </div>
                <div>
                <input
                    {...register("email", {
                      required: true,
                      minLength: 2,
                      maxLength: 25,
                      pattern: regEmail,
                    })}
                    type="email"
                    placeholder="example@email.com"
                  />
                  {errors.email && <small>Please fill valid email.</small>}
                </div>
                <div>
                <input {...register("phone", {
                  required: true,
                  minLength:6,
                  maxLength:12, 
                })} type="text" placeholder="Enter your phone" />
                {errors.phone && <small>Enter valid phone.</small>}
                </div>
                <button>submit</button>
                
              </form>
            </div>
          </main>
       
      </footer>
    </Wrapper>

  )
}

export default Footer
