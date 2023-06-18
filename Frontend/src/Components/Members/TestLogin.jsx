import {useForm } from 'react-hook-form'
import axios from '../../Utils/axios'
import { Link } from 'react-router-dom'
//manage form data
//submit form data
//validation and provide visual feedback
//every form has few moving parts that keep changing from the time a user loads
//the forms to the time they submit it
//current v alue of every field in the form
//form state is a object with lot of properties.
import {DevTool} from '@hookform/devtools'

let count = 0



export default function TestLogin() {
count ++
    const form = useForm(
        {
            defaultValues : {
                email : "",
                password : "",
                date : ""
            }
        }
    )
    const {register , control , handleSubmit , formState , reset } = form // associate devtool with control
    const {errors} = formState

    const onSubmit = (data) => {
        console.log( "Form submission" , data);
    }
    
    const onError = (errors) => {
        console.log("form errors" , errors)
    }


    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account {count}
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit , onError)} className="space-y-6" noValidate>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    {...register("email",
                        {
                            required : {
                                value : true,
                                message : "Email is required !!"
                            },
                            validate :  {
                                notAdmin : (fieldValue) => {
                                    return fieldValue !== 'admin@example.com' ||
                                    'Enter another Email address'
                                    // As long as the fieldvalue is not admin@example.com, validation is satisfied
                                    // it will return true,
                                    // if it is admin@example.com, it will return the error message.
                                    // either true or error message
                                },
                                notBlackListed : (fieldValue) => {
                                    return !fieldValue.endsWith("baddomain.com") ||
                                    'Enter another Email addresss'
                                }
                            },
                            pattern : {
                                value : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message : "Enter a valid Email address"
                            }
                        }
                    )}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                <p className='text-red-600 text-sm' >{errors.email?.message}</p>
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    {...register("password",
                        {
                            required : {
                                value : true,
                                message : 'Password is required !!'
                            }
                        },
                    )}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                <p className='text-red-600 text-sm' >{errors.password?.message}</p>
                </div>

              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    age
                  </label>
                  <div className="text-sm">
                    <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="date"
                    type="date"
                    {...register("date",
                        {   
                            valueAsDate : true,
                            required : {
                                value : true,
                                message : 'date is required !!'
                            }
                        },
                    )}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex mb-2 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
                <button
                  type="click"
                  onClick={() => reset()}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset
                </button>
              </div>
            </form>
            <DevTool control={control} />
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Start a 14 day free trial
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  