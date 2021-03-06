import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import Cookie from "js-cookie";

export default function NavbarSignUp() {
  const router = useRouter();
  const login = (e) => {
    e.preventDefault();
    router.push("/auth/login");
  };
  return (
    <>
      <nav className="navbar-auth">
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-2">
                <Image
                  src="/images/panda-coffee.png"
                  width={30}
                  height={33}
                  className="image-auth"
                />
              </div>
              <div className="col-md-6">
                <p>Panda Coffee Shop</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <button
              type="button"
              className="button-nav-auth btn btn-warning btn-block rounded-pill"
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
