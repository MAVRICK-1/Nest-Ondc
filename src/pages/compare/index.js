import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import QuantityBox from "../../components/quantityBox";
import "./style.css";
// import { getDatabase, ref, onValue, remove } from "firebase/database";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import MapComponent from "../../components/map/ITEMmap";
import { db } from "../../firebase";
const WishList = () => {
	const [wishlistItems, setWishlistItems] = useState([]);
	const [userLocation, setUserLocation] = useState(null);
	const [error, setError] = useState(null);
	const [totalPrice, setTotalPrice] = useState(0);
	const context = useContext(MyContext);
	const navigate = useNavigate();
	const [uid, setUid] = useState(localStorage.getItem("uid"));

	console.log(wishlistItems);
	useEffect(() => {
		try {
			if (context.isLogin === "true") {
				fetchWishlistProducts();
			} else {
				navigate("/signIn"); // Navigate to About Us page if not logged in
			}

			window.scrollTo(0, 0);
		} catch (error) {
			console.error("Error:", error);
			setError("Failed to fetch data from the server"); // Set error state if there's an error with database connection
		}
	}, []);


	useEffect(()=>{
		navigator.geolocation.getCurrentPosition(
			(position) =>{
				console.log(position.coords.latitude, position.coords.longitude);
				setUserLocation([position.coords.latitude, position.coords.longitude]);
			},
			(error) => {
				console.error("Error getting user location:",error);
			}
		);
	},[context.isLogin]);

	useEffect(() => {
		fetchWishlistProducts();
	}, [db, uid]);

	const fetchWishlistProducts = async () => {
		try {
			const wishlistsRef = doc(db, "wishlists", uid);
			const productsCollectionRef = collection(wishlistsRef, "products");
			const querySnapshot = await getDocs(productsCollectionRef);
			let products = [];
			let price = 0;
			querySnapshot.forEach((doc) => {
				products.push({ id: doc.id, ...doc.data() });
				price += parseInt(doc.data()?.price) * doc.data()?.quantity;
			});
			context.setWishlistCount(products.length);
			console.log(products);
			setWishlistItems(products);
			setTotalPrice(price);
		} catch (error) {
			console.error("Error fetching wishlist products:", error);
		}
	};

	const getDistance = (start, end) => {
		const toRadians = (degrees) => (degrees * Math.PI) / 180;
	
		const earthRadiusKm = 6371; // Radius of the Earth in kilometers
		const dLat = toRadians(end[0] - start[0]);
		const dLon = toRadians(end[1] - start[1]);
	
		const lat1 = toRadians(start[0]);
		const lat2 = toRadians(end[0]);

		const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = earthRadiusKm * c;
		return distance;

	};

	const deleteWishlistItem = async (uid, wishlistItemId) => {
		const wishlistItemRef = doc(
			db,
			"wishlists",
			uid,
			"products",
			wishlistItemId
		);

		try {
			await deleteDoc(wishlistItemRef);
			fetchWishlistProducts();
			console.log("Wishlist item deleted successfully.");
		} catch (error) {
			console.error("Error deleting wishlist item:", error);
		}
	};

	const deleteAllWishlistItems = async (uid) => {
		const productsCollectionRef = collection(
			db,
			"wishlists",
			uid,
			"products"
		);

		try {
			const querySnapshot = await getDocs(productsCollectionRef);
			querySnapshot.forEach(async (doc) => {
				await deleteDoc(doc.ref);
			});
			await fetchWishlistProducts();
			console.log("All wishlist items deleted successfully.");
		} catch (error) {
			console.error("Error deleting wishlist items:", error);
		}
	};

	const updateWishlist = (items) => {
		setWishlistItems(items);
	};

	const updateDistance = (productCoords)=>{
		console.log(productCoords)
		const distance = Math.round(getDistance(userLocation, productCoords));
		console.log(distance)
		return distance;
	}

	return (
		<>
			{wishlistItems.length > 0 ? (
				// Render cart section if cartItems array is not empty
				<>
					{context.windowWidth > 992 && (
						<div className="breadcrumbWrapper mb-4">
							<div className="container-fluid">
								<ul className="breadcrumb breadcrumb2 mb-0">
									<li>
										<Link to={"/"}>Home</Link>
									</li>
									<li>Shop</li>
									<li>Wishlist</li>
								</ul>
							</div>
						</div>
					)}
					<section className="cartSection mb-5">
						<div className="container-fluid">
							<div className={context.windowWidth > 770 && "row"}>
								<div
									className={`${
										context.windowWidth < 770
											? "col-md-full"
											: "col-md-7"
									}`}
								>
									<div className="d-flex align-items-center w-100">
										<div className="left">
											<h1 className="hd mb-0">
												Your Comparisons
											</h1>
											<p>
												There are{" "}
												<span className="text-g">
													{wishlistItems.length}
												</span>{" "}
												products in your Comparison Table
											</p>
										</div>

										<span
											className="ml-auto clearCart d-flex align-items-center cursor "
											onClick={() =>
												deleteAllWishlistItems(uid)
											}
										>
											<DeleteOutlineOutlinedIcon /> Clear
											Comparison
										</span>
									</div>
									<MapComponent data={wishlistItems} />
									<div className="compareWrapper mt-4">
										<div className="table-responsive">
											<table className="table">
											<tbody>
												<div class="add">
													<td>
														<tr><b>Product</b></tr>
														<tr height="10 rem"><b>Description</b></tr>
														<tr><b>Unit Price</b></tr>
														<tr><b>Distance</b></tr>
														<tr><b>Remove</b></tr>
													</td>
												</div>

													{wishlistItems.length !==
														0 &&
														wishlistItems.map(
															(item, index) => {
																console.log(item)
																return (
																	<td>
																		<tr
																			width={
																				"50%"
																			}
																		>
																			<div className="d-flex align-items-center">
																				<div className="img">
																					<Link
																						to={`/product/${item.id}`}
																					>
																						<img
																							src={
																								item.catImg +
																								"?im=Resize=(100,100)"
																							}
																							className="w-100"
																						/>
																					</Link>
																				</div>

																				<div className="info pl-4">
																					<Link
																						to={`/product/${item.id}`}
																					>
																						<h4>
																							{
																								item.productName
																							}
																						</h4>
																					</Link>
																					<Rating
																						name="half-rating-read"
																						value={parseFloat(
																							item.rating
																						)}
																						precision={
																							0.5
																						}
																						readOnly
																					/>{" "}
																					<span className="text-light">
																						(
																						{parseFloat(
																							item.rating
																						)}
																						)
																					</span>
																				</div>
																			</div>
																		</tr>
																		<tr style={{height:'10 rem'}}>
																			<span>
																				{item.description}
																			</span>
																		</tr>

																		<tr width="20%">
																			<span className ="comprice">
																				₹{" "}
																				{parseInt(
																					item.price
																						.split(
																							","
																						)
																						.join(
																							""
																						)
																				)}
																			</span>
																		</tr>

																		<tr>
																			<span className="comdistance">
																				{updateDistance(item.coordinates)} km
																			</span>
																		</tr>

																		<tr align="center">
																			<span
																				className="cursor"
																				onClick={() =>
																					deleteWishlistItem(
																						uid,
																						`${item?.id}`
																					)
																				}
																			>
																				<DeleteOutlineOutlinedIcon />
																			</span>
																		</tr>
																	</td>
																);
															}
														)}
												</tbody>
											</table>
										</div>
									</div>

									<br />

									<div className="d-flex align-items-center">
										<Link to="/">
											<Button className="btn-g">
												<KeyboardBackspaceIcon />{" "}
												Continue Shopping
											</Button>
										</Link>
										{/* <Button className='btn-g ml-auto' onClick={updateCartData}>
                    <RefreshIcon /> Update Cart</Button> */}
									</div>
								</div>

								<div className="col-md-4 cartRightBox">
									<div className="card p-4 ">
										<div className="d-flex align-items-center mb-4">
											<h5 className="mb-0 text-light">
												Subtotal
											</h5>
											<h3 className="ml-auto mb-0 font-weight-bold">
												<span className="text-g">
													₹
													{wishlistItems.length !==
														0 &&
														wishlistItems
															.map(
																(item) =>
																	parseInt(
																		item.price
																			.split(
																				","
																			)
																			.join(
																				""
																			)
																	) *
																	item.quantity
															)
															.reduce(
																(
																	total,
																	value
																) =>
																	total +
																	value,
																0
															)}
												</span>
											</h3>
										</div>

										<div className="d-flex align-items-center mb-4">
											<h5 className="mb-0 text-light">
												Shipping
											</h5>
											<h3 className="ml-auto mb-0 font-weight-bold">
												<span>Free</span>
											</h3>
										</div>

										<div className="d-flex align-items-center mb-4">
											<h5 className="mb-0 text-light">
												Estimate for
											</h5>
											<h3 className="ml-auto mb-0 font-weight-bold">
												United Kingdom
											</h3>
										</div>

										<div className="d-flex align-items-center mb-4">
											<h5 className="mb-0 text-light">
												Total
											</h5>
											<h3 className="ml-auto mb-0 font-weight-bold">
												<span className="text-g">
													₹
													{wishlistItems.length !==
														0 &&
														wishlistItems
															.map(
																(item) =>
																	parseInt(
																		item.price
																			.split(
																				","
																			)
																			.join(
																				""
																			)
																	) *
																	item.quantity
															)
															.reduce(
																(
																	total,
																	value
																) =>
																	total +
																	value,
																0
															)}
												</span>
											</h3>
										</div>

										<br />
										<Button className="btn-g btn-lg">
											Proceed To CheckOut
										</Button>
									</div>
								</div>
							</div>
						</div>
					</section>{" "}
				</>
			) : (
				// Render message indicating cart is empty if cartItems array is empty
				<div className="container-fluid">
					<div className="row">
						<div className="col d-flex align-items-center justify-content-center mt-4 mb-4">
							<div className="text-center">
								<h2>Your Wishlist is Empty</h2>
								<p>Please add some products to your wishlist</p>
								<Link to="/">
									<Button className="btn-g">
										<KeyboardBackspaceIcon /> Start Shopping
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default WishList;
