import React from "react";
import {
  doApiMethod,
} from "../../../services/axios-service/axios-service";
import { useForm } from "react-hook-form";
import { successHandler } from "../../../services/extra-services/extra-services";

const ContactForm = () => {
  let {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const onSub = (_dataBody) => {
    console.log(_dataBody);
    sendEmail(_dataBody);
    successHandler("your message sent successfully");
    reset();
  };
  const sendEmail = async (_dataBody) => {
    try {
      const url = "/users/clientEmail";
      const { data } = await doApiMethod(url, "POST", _dataBody);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSub)}>
      <div>
        <input
          {...register("firstName", {
            required: true,
            minLength: 2,
            maxLength: 25,
          })}
          type="text"
          placeholder="Enter First Name"
        />
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
        <input
          {...register("phone", {
            required: true,
            minLength: 6,
            maxLength: 12,
          })}
          type="text"
          placeholder="Enter your phone"
        />
        {errors.phone && <small>Enter valid phone.</small>}
      </div>
      <div>
        <textarea
          rows={4}
          {...register("textarea", {
            required: true,
            minLength: 6,
            maxLength: 50,
          })}
          placeholder="Enter your request"
        ></textarea>
        {errors.textarea && <small>Enter valid request.</small>}
      </div>
      <button>submit</button>
    </form>
  );
};
export default ContactForm;
