import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as message from "../../components/MessageComponent/Message";
import styles from "./style";
import { toast } from "react-toastify";

const defaultAvatar = "https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const mutation = useMutationHooks((data) => UserService.signupUser(data));
  const { data, isSuccess, isError } = mutation;

  const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Minimum length of 6 characters
  };

  const handleOnchangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? "" : "Invalid email address");
  };

  const handleOnchangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value) ? "" : "Password must be at least 6 characters");
  };

  const handleOnchangeConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(value === password ? "" : "Passwords do not match");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!validateEmail(email) || !validatePassword(password) || password !== confirmPassword) {
      // Prevent form submission if validation fails
      if (!validateEmail(email)) setEmailError("Invalid email address");
      if (!validatePassword(password)) setPasswordError("Password must be at least 6 characters");
      if (password !== confirmPassword) setConfirmPasswordError("Passwords do not match");
      return;
    }
    mutation.mutate({
      email,
      password,
      confirmPassword,
      count,
      avatar,
    });
  };

  const handleNavigateSignin = () => {
    navigate("/signin");
  };

  useEffect(() => {
    if (isError) {
      message.error();
    } else if (isSuccess && data?.status !== "ERR") {
      toast.success("Registration successful! Please check your email.");
      handleNavigateSignin();
    }
  }, [isSuccess, isError]);

  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Reset Password"
              className="w-full h-auto"
            />
          </div>
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0 p-4">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Register as a new user
              </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => handleOnchangeEmail(e)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type={visible ? "text" : "password"}
                        name="password"
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => handleOnchangePassword(e)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      {visible ? (
                        <AiOutlineEye
                          className="absolute right-2 top-2 cursor-pointer"
                          size={25}
                          onClick={() => setVisible(false)}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          className="absolute right-2 top-2 cursor-pointer"
                          size={25}
                          onClick={() => setVisible(true)}
                        />
                      )}
                    </div>
                    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type={visible ? "text" : "password"}
                        name="confirmPassword"
                        autoComplete="new-password"
                        required
                        value={confirmPassword}
                        onChange={(e) => handleOnchangeConfirmPassword(e)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      {visible ? (
                        <AiOutlineEye
                          className="absolute right-2 top-2 cursor-pointer"
                          size={25}
                          onClick={() => setVisible(false)}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          className="absolute right-2 top-2 cursor-pointer"
                          size={25}
                          onClick={() => setVisible(true)}
                        />
                      )}
                    </div>
                    {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
                  </div>

                  <div>
                    <button
                      disabled={
                        !email.length ||
                        !password.length ||
                        !confirmPassword.length ||
                        emailError ||
                        passwordError ||
                        confirmPasswordError
                      }
                      onClick={handleSignup}
                      type="submit"
                      className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Submit
                    </button>
                  </div>
                  <div className={`${styles.noramlFlex} w-full`}>
                    <span>Already have an account?</span>
                    <Link to="/signin" className="text-blue-600 ml-2">
                      Sign In
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
