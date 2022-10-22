import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../components/ui/Error";
import { useLoginMutation } from "../features/auth/authApi";
import logoImage from "../assets/logo/logo.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    }
    if (data?.accessToken && data?.user) {
      navigate("/home/teams");
    }
  }, [data, responseError, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    login({
      email,
      password,
    });
  };

  return (
    <div className="grid place-items-center h-screen bg-[#F9FAFB">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link to="/">
              <img
                className="mx-auto h-12 w-auto"
                src={logoImage}
                alt="thisisrid"
              />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="text-gray-500 my-1">
                  Email address :
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="text-gray-500 my-1">
                  Password :
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  to="/register"
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Register
                </Link>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                disabled={isLoading}
              >
                Sign in
              </button>
            </div>
            <div>
              <h3 className="text-xl text-center font-bold text-gray-600 py-2">
                some users cred{" "}
              </h3>
              <table className="">
                <tr>
                  <th>Email</th>
                  <th>Pass</th>
                </tr>
                <tr>
                  <td>rid1@gmail.com</td>
                  <td>asdfasdf</td>
                </tr>
                <tr>
                  <td>rid2@gmail.com</td>
                  <td>asdfasdf</td>
                </tr>
                <tr>
                  <td>rid3@gmail.com</td>
                  <td>asdfasdf</td>
                </tr>
                <tr>
                  <td>rid4@gmail.com</td>
                  <td>asdfasdf</td>
                </tr>
                <tr>
                  <td>rid5@gmail.com</td>
                  <td>asdfasdf</td>
                </tr>
                <tr>
                  <td>rid6@gmail.com</td>
                  <td>asdfasdf</td>
                </tr>
              </table>
            </div>

            {error !== "" && <Error message={error} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
