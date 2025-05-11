import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import userSlice, { signupForUser } from "../../redux/reducer/UserSlice";
import { notify } from "../Admin/notify";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const SignUp = () => {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const dispatch = useDispatch()
  const alert = useSelector(state => state.users.alert)
  const navigate = useNavigate()
  useEffect(() => {

    if (alert !== undefined) {
      notify(alert.message, alert.code)
      if (alert.code == 1) setTimeout(navigate("/login"),2000)
    }
    return () => {
      dispatch(userSlice.actions.resetAlert(undefined))
    }
  }, [alert, dispatch])
  const handleSubmit = () => {
    const newUser = {
      username: username,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: password
    }
    dispatch(signupForUser(newUser))

  }
  return (
    <div className="overflow-hidden bg-cover bg-no-repeat h-[100vh] p-12 bg-[url('../public/static/images/web-images/bg-login.jpg')]">
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-[90vh] lg:py-0">
          <Link to="/" className="flex items-center mb-4 text-2xl font-semibold">
            <img className="w-12 h-12 mr-2 mt-1" src="/static/images/web-images/logo.png" alt="logo" />
            <span className="text-black">Technology shop</span>
          </Link>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-[#e95221] md:text-2xl text-center">
                Đăng ký tài khoản
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
                    placeholder="anguyenvan"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border-[2px] border-orange-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 block w-full p-2.5 "
                    placeholder="Nguyễn Văn A"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border-[2px] border-orange-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 block w-full p-2.5 "
                    placeholder="badmintonshop@gmail.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    className="bg-gray-50 border-[2px] border-orange-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 block w-full p-2.5 "
                    placeholder="0988887777"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <button
                  type="button"
                  className="w-full text-white bg-[#ff5a3d] focus:bg-sky-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleSubmit}
                >
                  Đăng ký
                </button>
                <p className="text-sm font-[400] text-gray-700">
                  Bạn đã có tài khoản?{" "}
                  <Link
                    to="/login"
                    className="font-[600] text-primary-600 hover:underline"
                  >
                    Đăng nhập ngay
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

export default SignUp;
