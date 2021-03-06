import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "utils/axios";
import { toast, ToastContainer } from "react-toastify";
import Modal from "react-bootstrap/Modal";

export default function Navbar() {
	const [isActive, setActive] = useState("");
	const user = useSelector((state) => state.auth.userLogin);
	const [search, setSearch] = useState("");
	const [allProduct, setAllProduct] = useState([]);
	const role = localStorage.getItem("role");
	const token = Cookies.get("token");
	const router = useRouter();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const formatIDR = (data) => {
		return parseInt(data)
			.toLocaleString("id-ID", parseInt(data))
			.replace("Rp", "IDR")
			.replace(",00", "");
	};
	const LogoutHandler = () => {
		Cookies.remove("token");
		Cookies.remove("id");
		localStorage.clear();
		router.push("/");
	};
	const getProduct = () => {
		axios
			.get(`/product?search=${search}`)
			.then((res) => {
				setAllProduct(res.data.data);
			})
			.catch((err) => {
				toast.error("Produk Tidak Ditemukan");

				console.log(err);
			});
	};
	const handleSearch = (e) => {
		if (e.key == "Enter") {
			console.log("ENTER");
			getProduct();
		}
		setSearch(e.target.value);
	};

	const pageLink = (value) => {
		setActive(value);
		router.push(
			`/${
				role === "admin" && value === "/" ? "" : role === "admin" ? "admin" : ""
			}/${value}`
		);
	};

	const pageLinkCustomer = (value) => {
		setActive(value);
		router.push(
			`/${
				role === "user" && value === "product"
					? "/"
					: role === "user" || value === "checkout" || value === "history"
					? "customer"
					: ""
			}/${value}`
		);
	};

	return (
		<>
			<header className="container navbar_main">
				<ToastContainer />

				<nav className="d-flex justify-content-between align-items-center py-4 ">
					<section className="navbar-brand-main flex align-items-center	">
						<img
							src="/images/logo-pandaCoffe.png"
							width={60}
							height={60}
							className="navbar-brand-logo"
							style={{ objectFit: "cover" }}
							alt="Logo"
						/>
						<img
							src="/icons/menu-hamburger.svg"
							width={22}
							className="mx-3 nav-icon-mobile d-flex d-md-none"
							height={14}
							style={{ objectFit: "cover" }}
							alt="Menu"
						/>
						<Link href="/">
							<span className="title-brand" style={{ cursor: "pointer" }}>
								Panda Coffee
							</span>
						</Link>
					</section>
					<section className="navbar-link-content">
						{role === "admin" ? (
							<>
								<span
									className={
										isActive === "/"
											? "nav-brand-link-active"
											: "nav-brand-link "
									}
									onClick={() => pageLink("/")}
								>
									Home
								</span>
								<span
									className={
										isActive === "product"
											? "nav-brand-link-active"
											: "nav-brand-link "
									}
									onClick={() => pageLink("product")}
								>
									Product
								</span>
								<span
									className={
										isActive === "manageOrder"
											? "nav-brand-link-active"
											: "nav-brand-link "
									}
									onClick={() => pageLink("manageOrder")}
								>
									Orders
								</span>
								<span
									cclassName={
										isActive === "dashboard"
											? "nav-brand-link-active"
											: "nav-brand-link "
									}
									onClick={() => pageLink("dashboard")}
								>
									Dashboard
								</span>
							</>
						) : role !== "admin" && token ? (
							<>
								<span
									className={
										isActive === "product"
											? "nav-brand-link-active"
											: "nav-brand-link "
									}
									onClick={() => pageLinkCustomer("product")}
								>
									Product
								</span>
								<span
									className={
										isActive === "checkout"
											? "nav-brand-link-active"
											: "nav-brand-link "
									}
									onClick={() => pageLinkCustomer("checkout")}
								>
									Your cart
								</span>
								<span
									className={
										isActive === "history"
											? "nav-brand-link-active"
											: "nav-brand-link "
									}
									onClick={() => pageLinkCustomer("history")}
								>
									History
								</span>
							</>
						) : null}
					</section>
					{token ? (
						<section className="navbar-section-profile d-flex flex-row-reverse align-items-center">
							<div className="dropdown">
								<img
									src={
										user[0]
											? user[0].image
												? `${
														process.env.APP_HOST === "PROD"
															? process.env.BASE_URL_PROD
															: process.env.BASE_URL_DEV
												  }upload/user/${user[0].image}`
												: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
											: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
									}
									width={45}
									height={45}
									className="nav-profile-image mx-4"
									style={{ cursor: "pointer" }}
									id="dropdownMenuLink"
									data-bs-toggle="dropdown"
									alt="Profile"
								/>

								<ul
									className="dropdown-menu"
									aria-labelledby="dropdownMenuLink"
								>
									<li>
										<a className="dropdown-item" href="/profile">
											Profile
										</a>
									</li>
									<li>
										<a className="dropdown-item" onClick={LogoutHandler}>
											Logout
										</a>
									</li>
								</ul>
							</div>

							<img
								src="/icons/shopping-cart.svg"
								width={24}
								height={24}
								className="nav-icon-mobile d-flex d-md-none"
								alt="Shoping Cart"
							/>
							<img
								src="/icons/chat-bubbles.svg"
								width={24}
								height={24}
								className="nav-icon-mobile d-flex d-md-none mx-3"
								alt="Chat"
							/>
							<img
								src="/icons/chat.svg"
								width={30}
								height={30}
								className="nav-profile-icon"
								alt="Chat"
							/>

							{role === "admin" ? null : (
								<button
									type="button"
									className="btn p-0 m-0"
									onClick={handleShow}
								>
									<img
										src="/icons/search.svg"
										width={30}
										height={30}
										style={{ cursor: "pointer" }}
										className="nav-profile-icon mx-4"
										alt="search icon"
									/>
								</button>
							)}
						</section>
					) : (
						<div className="d-flex flex-row-reverse">
							<button
								className="nav-button-auth-signup mx-1"
								onClick={() => router.push("/auth/register")}
							>
								Sign Up
							</button>
							<button
								className="nav-button-auth-login mx-1"
								onClick={() => router.push("/auth/login")}
							>
								Login
							</button>
						</div>
					)}
				</nav>
			</header>
			<hr style={{ margin: "0px" }} />

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Body>
					<label className="form-control-label">Product Name</label>
					<input
						type="text"
						className="form-control p-3 mt-3"
						placeholder="Input Name Product & Enter"
						onKeyPress={(e) => handleSearch(e)}
					/>
					{allProduct.map((e) => (
						// console.log(e.price[0]),
						<div className="mt-3">
							<div className="card card-body mb-0 pb-0">
								<div className="d-flex justify-content-between">
									<div className="d-flex">
										<img
											src={`${
												process.env.APP_HOST === "PROD"
													? process.env.BASE_URL_PROD
													: process.env.BASE_URL_DEV
											}upload/product/${e.image}`}
											alt=""
											className="product-details__img-product product__search mb-3"
											width="70px"
										/>
										<Link href={`/customer/productDetails/${e.id}`}>
											<a
												href=""
												style={{ textDecoration: "none", color: "black" }}
												onClick={handleClose}
											>
												<h5 className="mt-2">{e.nameProduct}</h5>
											</a>
										</Link>
									</div>
									<h6 className="mt-2 fw-bold ">
										Rp {formatIDR(parseInt(e.price[0]))}
									</h6>
								</div>
							</div>
						</div>
					))}
				</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-warning px-5 py-2" onClick={handleClose}>
						Close
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
