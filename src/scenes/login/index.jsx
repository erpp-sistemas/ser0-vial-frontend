import ImageLogin from "../../../public/image-login.svg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TailwindAlert from "../../components/tailwindAlert.jsx";
//import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
import LogoSer0VialImage from "../../../public/logo-ser0-vial.png";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { login } from "../../services/auth.service";
import LoadingModal from "../../components/modals/modalLoading";
import { Person, Visibility, VisibilityOff } from "@mui/icons-material";

function index({ setLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState("info");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      console.log("Debe ingresar un usuario o contraseña.")
      setAlertTitle("Atencion");
      setAlertMessage("Debe ingresar un usuario o contraseña.");
      setAlertType("warning");
      setAlertOpen(true);
      return;
    }

    setShowModal(true);

    login(username, password)
      .then((user) => {
        const status_app_web = verifyStatusAppWeb(user.access_web);
        if (!status_app_web)
          throw new Error("Usuario sin acceso a la plataforma");
        generateDataUser(user);
       // dispatch(cleanMessages());
        sessionStorage.setItem("user_session", JSON.stringify(user));
        setShowModal(false);
        setLogin(false);
        console.log(user)
        setAlertTitle("Error");
        setAlertMessage(error);
        setAlertType("error");
        setAlertOpen(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setAlertTitle("Error");
        setAlertMessage(error);
        setAlertType("error");
        setAlertOpen(true);
        setShowModal(false);
      });
  };

  const verifyStatusAppWeb = (access_app_web) => {
    return access_app_web === 1
  };

  const generateDataUser = (data_user) => {    
    const obj = {
      user_id: data_user.user_id,
      username: data_user.username,
      password: data_user.password,
      first_name: data_user.first_name,
      middle_name: data_user.middle_name,
      paternal_surname: data_user.paternal_surname,
      maternal_surname: data_user.maternal_surname,
      birthdate: data_user.birthdate,
      photo_url: data_user.photo_url,
      entry_date: data_user.entry_date,
      low_date: data_user.low_date,
      active: data_user.active,
      access_web: data_user.access_app_web,
      access_movil: data_user.access_movil,
      role_id: data_user.role_id,   
      theme_color: data_user.theme_color   
      //token: data_user.token,
    };
    dispatch(setUser(obj));
  };

  return (
    <div className="font-[sans-serif] bg-gray-50">
      <LoadingModal open={showModal} />
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <TailwindAlert
              alertOpen={alertOpen}
              setAlertOpen={setAlertOpen}
              title={alertTitle}
              message={alertMessage}
              type={alertType}
            />
            <form className="space-y-4">
              <div className="mb-8">
                {/* Aquí agregamos el logo */}
                <div className="mt-4 flex justify-center">
                  <img
                    src={LogoSer0VialImage}
                    className="h-16 w-auto"
                    alt="Logo del Sistema"
                  />
                </div>
                <div className="mt-4 flex justify-center">
                  <h3 className="text-gray-800 text-3xl font-extrabold">
                    Iniciar sesion
                  </h3>
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Usuario
                </label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                    placeholder="Ingresa tu usuario"
                  />
                  <Person className="w-[18px] h-[18px] absolute right-4" />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Contraseña
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"} // Cambia el tipo basado en el estado
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                    placeholder="Ingresa tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} // Alterna el estado
                    className="absolute right-4 text-gray-800 hover:text-gray-400"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    for="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    Recordarme
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="jajvascript:void(0);"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Olvidaste tu contraseña?
                  </a>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none font-bold"
                >
                  Acceso
                </button>
              </div>
            </form>
          </div>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img
              src={ImageLogin}
              className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
              alt="Dining Experience"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
