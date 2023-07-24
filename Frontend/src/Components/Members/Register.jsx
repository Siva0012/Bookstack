import { Link } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

//user APIs
import { memberRegister } from "../../Utils/MemberApis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const passwordRegex =
    `/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/`;
  const validationSchema = yup.object({
    userName: yup
      .string()
      .min(3, "Username should have atleast 3 characters !!")
      .required("Required Username !!"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Required Email !!"),
    password: yup
      .string()
      .matches(passwordRegex, "Please enter a strong password")
      .required("Required Password !!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password !!"),
    phone: yup
      .string()
      .min(10, "Enter a valid phone number")
      .required("Required Phone number !!"),
  });
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
    
  });

  console.log("errors", formik.errors);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      memberRegister(formData)
        .then((res) => {
          if (res.data.memberCreated) {
            toast.success(
              "Please check the Email and verify your Email address"
            );
            navigate("/login");
            //add modal here!!!
          }
          // localStorage.setItem("userJwt", res.data.token);
          // navigate("/");
          // toast.success(`Signed in as "${res.data.member}"`);
        })
        .catch((err) => {
          if (err.response.data.error) {
            toast.error(err.response.data.error);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center py-4">
        <h2 className="tracking-wide uppercase font-nunito text-lg md:text-xl font-semibold lg:text-2xl">
          bookstack
        </h2>
        <h2 className="text-center text-sm md:text-md lg:text-lg font-semibold text-gray-700 leading-9 tracking-tight">
          Register as a member
        </h2>
        <div className="flex flex-col items-center justify-center lg:w-[550px] lg:h-[550px] mt-2">
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="h-[85px]">
              <label
                htmlFor="userName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="userName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* Error message */}
                <div className="text-red-600 font-mono text-[12px] lg:text-[12px] font-semibold">
                  {
                    formik.touched.userName && formik.errors.userName ? formik.errors.userName : ''
                  }
                </div>
              </div>
            </div>

            <div className="h-[85px]">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}

                />
                {/* Error message */}
                <div className="text-red-600 font-mono text-[12px] lg:text-[12px] font-semibold ">
                  {
                    formik.touched.email && formik.errors.email ? formik.errors.email : ''
                  }
                </div>
              </div>
            </div>

            <div className="h-[85px]">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="phone"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}

                />
                {/* Error message */}
                <div className="text-red-600 font-mono text-[12px] lg:text-[12px] font-semibold ">
                  {
                    formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''
                  }
                </div>
              </div>
            </div>

            <div className="h-[85px]">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}

                />
                {/* Error message */}
                <div className="text-red-600 font-mono text-[12px] lg:text-[12px] font-semibold ">
                  {
                    formik.touched.password && formik.errors.password ? formik.errors.password : ''
                  }
                </div>
                <input
                  value={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                  className="absolute lg:w-[15px] lg:h-[15px] top-[9px] right-1 border-[2px] border-black/20 bg-white focus:ring-0"
                  type="checkbox"
                />
              </div>
            </div>

            <div className="h-[85px]">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm password
              </label>
              <div className="mt-1 relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  name="confirmPassword"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}

                />
                {/* Error message */}
                <div className="text-red-600 font-mono text-[12px] lg:text-[12px] font-semibold ">
                  {
                    formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ''
                  }
                </div>
                
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <button
                type="submit"
                className=" w-1/2 rounded-md bg-signUpGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
              <p className=" ml-4 w-1/2 text-sm text-black">
                Already have an account? click{" "}
                <Link
                  to="/login"
                  className="font-semibold underline text-blue-700"
                >
                  here
                </Link>{" "}
                to login{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="mt-10 mx-auto sm:mx-auto md:mx-auto lg:mx-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>
        <form
          className="space-y-6"
          action=""
          method="POST"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                Name
              </label>
            </div>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="current-name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 "
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                Phone
              </label>
            </div>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="number"
                autoComplete="current-phone"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                Confirm password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="confirmPassword"
                autoComplete="current-confirmPassword"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="w-full flex justify-between items-center">
            <button
              type="submit"
              className=" w-1/2 rounded-md bg-signUpGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
            <p className=" ml-4 w-1/2 text-sm text-gray-500">
              Already have an account? click{" "}
              <Link
                to="/login"
                className="font-semibold underline text-blue-700"
              >
                here
              </Link>{" "}
              to login{" "}
            </p>
          </div>
        </form>
      </div> */}
    </>
  );
}
