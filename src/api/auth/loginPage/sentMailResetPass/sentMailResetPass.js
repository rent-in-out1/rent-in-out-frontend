import React ,{useState} from "react";
import { Button } from "../../../../components/style/wrappers/registerPage";
import { useForm } from "react-hook-form";
import { errorHandler, API_URL_CLIENT, doApiMethod, successHandler } from './../../../../services/service';

const SentMailResetPass = () => {
  const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [massege , setShowmassege] = useState(false)
  let {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSub = async (_dataBody) => {
    const requestData = {
      email: _dataBody.email,
      redirectUrl: API_URL_CLIENT,
    };
    try {
      const url = "/users/requestPasswordReset";
      const {data}= await doApiMethod(url , "POST", requestData);
      console.log(data)
      if (data.status === "Pending") {
        successHandler("Reset request sent successfully please check your email")
      }
      else if (data.status === "failed") {
        errorHandler(data.message);
      }
    } catch (err) {
      errorHandler(err.response.data.msg);
    }
  };
  return (
    <div className="right w-full md:w-2/3">
      <form onSubmit={handleSubmit(onSub)}>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <label>Email</label>
            <input
              {...register("email", {
                required: true,
                minLength: 5,
                maxLength: 100,
                pattern: regEmail,
              })}
              type="email"
              placeholder="example@email.com"
            />
            {errors.email && <small>Please fill valid email.</small>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <label>Confirm Email</label>
            <input
              {...register("email2", {
                required: true,
                validate: (value) => {
                  return value === getValues("email");
                },
              })}
              type="email"
              placeholder="example@email.com"
            />
            {errors.email2 && <small>Email not match.</small>}
          </div>
        </div>
        <Button>
          <button>Send Password Reset Request</button>
        </Button>
      </form>
    </div>
  );
};

export default SentMailResetPass;
