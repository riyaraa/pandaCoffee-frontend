import React, { useState } from "react";
import Image from "next/image";
import { Layout } from "components";
import { toast, ToastContainer } from "react-toastify";
import axios from "utils/axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { unAuthPage } from "middleware/authorizationPage";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
export default function forgotPassword() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/forgot-password", form)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <Layout pageTitle="" isLogged={true}>
      <main className="forgot-password-content">
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="forgot-contain col-md-6">
              <ToastContainer />
              <div className="forgot-title">
                <h1>FORGOT YOUR PASSWORD</h1>
                <p className="forgot-p">Dont worry, we got your back</p>
              </div>
              <form className="forgot-password-form" onSubmit={handleSubmit}>
                <div class="row">
                  <div class="col-md-8 col-sm-8 p-0 m-0">
                    <label for="inputPassword2" className="visually-hidden">
                      Password
                    </label>
                    <input
                      type="email"
                      className="forgot-input-email form-control rounded"
                      id="email"
                      name="email"
                      placeholder="Enter your Email Adress to get Link"
                      onChange={handleChangeText}
                    />
                  </div>
                  <div class="col-md-4 col-sm-4 p-0 m-0">
                    <button
                      type="submit"
                      className="button-forgot-password btn btn-warning mb-3 rounded"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
              {/* Bagian Resend Link belum di handle */}
              {/* <p className="forgot-note">
                Click here if you didn’t receive any link in 2 minutes
              </p>
              <div className="text-center">
                <button
                  type="submit"
                  className="button-resend-link btn btn-warning mb-3 rounded"
                >
                  Resend Link
                </button>
              </div> */}

              {/* Bagian Resend Link belum di handle */}
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
