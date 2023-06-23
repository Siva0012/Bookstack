import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateMemberData } from "../../Redux/Member/MemberDataSlice";

//react icons
import { FcGoogle } from "react-icons/fc";

//user APIs
import { memberLogin, googleLogin } from "../../Utils/MemberApis";

//toaster
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//state
import { useState } from "react";

//formik initialvalues
const initialValues = {
  email: "",
  password: "",
};

//formik validation schema
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format !").required("Requried !"),
  password: Yup.string().required("Required !"),
});

//message
const notify = (message) => {
  return toast.success(message);
};
//error
const toastError = (message) => {
  return toast.error(message);
};

//component
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [user, setUser] = useState({});

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) =>
      console.log("Google login failed in useGoogleLogin =", error),
  });

  if (user) {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log('userdata' , res);
        setUser(res.data);
      })
      .catch((err) => console.log(err));

    //calling googleLogin server side function for member registration.
    googleLogin(user)
      .then((response) => {
        localStorage.setItem("userJwt", response.data.token);
        notify(response.data.message);
        navigate("/");
      })
      .catch((err) => {
        toastError(err.response.data.error);
      });
  }

  //formik on submit
  const onSubmit = async (values) => {
    memberLogin(values)
      .then((response) => {
        if (response.data) {
          localStorage.setItem("userJwt", response.data.token);
          dispatch(updateMemberData(response.data.member))
          navigate("/");
          notify(response.data.message);
        }
      })
      .catch((response) => {
        console.log(response);
        if (response.response.data.error) {
          toastError(response.response.data.error);
        }
      });
  };

  return (
    <>
      <div className="flex ">
        {/* <div className="flex flex-col justify-between">
          <div className="mx-auto mt-2">
            <h1 className="text-2xl font-nunito font-bold ">BOOKSTACK</h1>
          </div>
          <div
            id="image-container"
            className="mx-auto lg:w-[500px] sm:w-[250px] md:w-[400px]"
          >
            <img
              className="object-contain rounded-lg"
              src="../../../public/public-images/image.jpg"
              alt=""
            />
          </div>
        </div> */}

        <div className="lg:ms-4 flex min-h-full flex-1 flex-col justify-center rounded-lg px-6 py-12 lg:px-6">
          <div
            id="drop-shadow"
            className="drop-shadow-[0px_0px_0px_rgba(0,0,0,0.2)]"
          >
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form className="space-y-6" action="" method="POST">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      />
                      <ErrorMessage name="email">
                        {(errMessage) => (
                          <div className="text-red-600">{errMessage}</div>
                        )}
                      </ErrorMessage>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                      <div className="text-sm">
                        <Link
                          href="#"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <ErrorMessage name="password">
                        {(errMessage) => (
                          <div className="text-red-600">{errMessage}</div>
                        )}
                      </ErrorMessage>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  </div>
                </Form>
              </Formik>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member? create an account{" "}
                <Link
                  to="/register"
                  className="font-semibold underline leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  here!
                </Link>
              </p>
              <div className="mt-10 text-center text-sm text-gray-500">
                <div
                  onClick={login}
                  className="rounded-md hover:bg-gray-600 hover:cursor-pointer hover:text-white border-2 border-gray-600 drop-shadow-md text-black font-semibold px-3 py-2 flex items-center justify-around"
                >
                  {" "}
                  Sign in with google <FcGoogle className="text-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
