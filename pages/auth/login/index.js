import React, { useState } from "react";
import { Layout } from "components";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { connect } from "react-redux";
import { loginUser, getUserLogin } from "store/action/auth";
import { Footer } from "components";
import { getDataCookie } from "middleware/authorizationPage";
import Image from "next/image";
// import { Alert } from "bootstrap";

export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  console.log(dataCookie.isLogin);
  if (dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/product",
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}

const Login = (props) => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  // Handle Login
  console.log(props);
  const handleSubmit = (e) => {
    e.preventDefault();
    props
      .loginUser(form)
      .then((res) => {
        // alert("BERHASIL REFRESH TOKEN");
        localStorage.setItem("token", res.value.data.data.token);
        localStorage.setItem("refreshToken", res.value.data.data.refreshToken);
        Cookie.set("token", res.value.data.data.token);
        Cookie.set("id", res.value.data.data.id);
        props.getUserLogin(res.value.data.data.id).then((responseUser) => {
          localStorage.setItem("role", responseUser.value.data.data[0].role);
          if (responseUser.value.data.data[0].role === "admin") {
            toast.success("Sukses Login");
            router.push("/admin/product");
          } else {
            router.push("/product");
          }
        });
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
      });
    console.log(form);
  };

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Handle Login End

  return (
    <Layout pageTitle="Login Panda Coffee" isLogged={false}>
      <div className="row">
        <div className="col-lg-6 hide__mobile">
          {/* <img src="/images/coffee-left.png" className="image-auth" /> */}
          <Image
            src="/images/coffee-left.png"
            alt="Picture of the author"
            width={700}
            height={1000}
          />
        </div>
        <div className="col-lg-6 content-right">
          {/* Auth Navbar */}
          {/* Auth Navbar End */}
          <ToastContainer />
          <h2 className="register-title">Login</h2>
          {/* Auth Login Form */}
          <div className="container auth-form">
            <form onSubmit={handleSubmit}>
              <label className="form-label">Email Adress</label>
              <div className="input-group input-group-sm mb-3">
                <input
                  type="email"
                  className="form-control p-3 "
                  name="email"
                  onChange={handleChangeText}
                />
              </div>
              <label className="form-label">Password</label>
              <div className="input-group input-group-sm mb-3">
                <input
                  type="password"
                  className="form-control p-3"
                  name="password"
                  onChange={handleChangeText}
                />
              </div>
              <a href="/auth/forgotPassword" className="forgot-password">
                Forgot Password ?
              </a>
              <br />
              <br />
              <p>
                Don't have account?{" "}
                <a href="/auth/register" className="forgot-password">
                  Register now
                </a>{" "}
              </p>
              <button className="button-submit btn btn-warning  rounded-pill mb-3 p-3 mt-5">
                Login
              </button>
            </form>
            {/* <button className="button-submit btn btn-light mt-3 rounded-pill">
              <img src="/images/google-logo.png" className="image-google" />
              Login with Google
            </button> */}
          </div>
          {/* Auth Login Form End */}
        </div>
      </div>
      <Footer></Footer>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};
const mapDispatchToProps = { loginUser, getUserLogin };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
