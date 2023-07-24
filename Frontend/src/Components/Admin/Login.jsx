import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
//toaster
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Admin APIs
import { adminLogin } from "../../Utils/AdminApis";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateAdminData } from "../../Redux/Admin/AdminDataSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("adminJwt")) {
      navigate("/admin");
    }
  }, []);

  const [showPassword, setshowPassword] = useState(false);

  const onSubmit = async (values) => {
    try {
      const response = await adminLogin(values);
      if (response) {
        localStorage.setItem("adminJwt", response.data.token);
        dispatch(updateAdminData(response.data.admin));
        toast.success(response.data.message)
        navigate("/admin");
      }
    } catch (err) {
      if (err.response.data.error) {
        return toast.error(err.response.data.error);
      }
      if (err.response) {
        console.log(err.response.data);
        const formErrors = {};
        err.response.data.forEach((error) => {
          formErrors[error.path] = error.msg;
        });
        formik.setErrors(formErrors);
      }
    }
  };

  const validationSchema = yup.object({
    email: yup.string().email().required("Required Email !!"),
    password: yup.string().required("Required Password !!"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 uppercase text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            bookstack
          </h2>
          <h2 className="mt-2 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
            Admin login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="h-[90px]">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`${
                    formik.touched.email && formik.errors.email
                      ? "ring-red-600"
                      : ""
                  } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
              </div>
              <div className="text-red-600 text-[13px] font-nunito">
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""}
              </div>
            </div>

            <div className="h-[90px]">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="password"
                  name="password"
                  type={`${showPassword ? "text" : "password"}`}
                  autoComplete="current-password"
                  className={`${
                    formik.touched.password && formik.errors.password
                      ? "ring-red-600"
                      : ""
                  } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
                <input 
                value={showPassword}
                onChange={() => setshowPassword((prev => !prev))}
                className="absolute lg:w-[15px] top-[11px] right-1 lg:h-[15px] border-[2px] border-black/20 bg-white focus:ring-0"
                type="checkbox"
                 />
              </div>
              <div className="text-red-600 text-[13px] font-nunito">
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-signUpGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
