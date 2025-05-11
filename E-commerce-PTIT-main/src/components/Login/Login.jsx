import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import userSlice, { login } from "../../redux/reducer/UserSlice";
import { notify } from "../Admin/notify";
import { ToastContainer } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false);
  const alert = useSelector(state => state.users.alert)
  useEffect(() => {

    if (alert !== undefined) {
      notify(alert.token, alert.code)
    }
    return () => {
      dispatch(userSlice.actions.resetAlert(undefined))
    }
  }, [alert, dispatch])
  const handleSubmit = async () => {
    const res =  await dispatch(login({ username: username, password: password })).unwrap()
    // const user = JSON.parse(localStorage.getItem("authorization"))
    if (res && res.role) {
      let role = res.role
      if (role === "ADMIN") window.location.href = '/admin'
      else if(role==="EMPLOYEE") window.location.href = '/employee'
      else window.location.href = '/'
    }
  };
  return (
    <div className="overflow-hidden bg-cover bg-no-repeat h-[100vh] p-12 bg-[url('../public/static/images/web-images/bg-login.jpg')]">
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[90vh] lg:py-0">
          <Link to="/" className="flex items-center mb-6 text-2xl font-semibold">
            <img className="w-12 h-12 mr-2 mt-1" src="/static/images/web-images/logo.png" alt="logo" />
            <span className="text-black">Tech Shop</span>
          </Link>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-[#e95221] md:text-2xl text-center">
                Đăng nhập tài khoản
              </h1>
              <form className="space-y-4 md:space-y-6" >
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="bg-gray-50 border-[2px] border-orange-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 block w-full p-2.5 "
                    placeholder="hugenguyen"
                    required
                    onChange={(e) => { setUsername(e.target.value) }}
                  />
                </div>
                <div className="relative">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Mật khẩu
                  </label>
                  <input
                    type={visible ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border-[2px] border-orange-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 block w-full p-2.5"
                    required
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-[40px] cursor-pointer text-orange-500"
                      size={20}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-[40px] cursor-pointer text-orange-500"
                      size={20}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:outline-none"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label for="remember" className="text-gray-800 ">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-primary-600 hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </div> */}
                <button
                  className="w-full text-white bg-[#ff5a3d] focus:bg-sky-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleSubmit}
                  type="button"
                >
                  Đăng nhập
                </button>
                <p className="text-sm font-[400] text-gray-700">
                  Bạn chưa có tài khoản?{" "}
                  <Link
                    to="/sign-up"
                    className="font-[600] text-primary-600 hover:underline"
                  >
                    Đăng ký
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;
