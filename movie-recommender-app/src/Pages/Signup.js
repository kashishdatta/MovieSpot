/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'

import logo from "../Pages/Components/images/ms-removebg-preview.png"


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { fname, lname, email, password } = this.state;
        if (fname === "" || lname === "" || email === "" || password === "") {
            alert("please enter the data first");
        }
        console.log(fname, lname, email, password);
        fetch("http://localhost:5000/register", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                fname,
                lname,
                email,
                password
            }),
        }).then((res) => res.json())
            .then((data) => {
                console.log(data, "User Registered")
                window.alert("User Registerd successfully...");
                window.location.href = "/sign-in"
            })

    }

    render() {
        return (
            <>

                <div className="main1">
                    <div className="logo1">
                        <img src={logo} style={{ height: "250px", width: "240px" }} />
                    </div>
                    <div className="sub-main1">
                        <div className="imgs">
                            <div className="container-img" >
                                <div className="form">
                                    <form onSubmit={this.handleSubmit}>
                                        <h2 style={{ fontWeight: "bold", color: "white", fontSize: "45px", marginLeft: "2.4rem" }}>Sign up</h2>
                                        <div className="mb-3">
                                            <label style={{ marginRight: "160px", fontSize: "15px", fontWeight: "500" }}>First name :</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="First name"
                                                onChange={e => this.setState({ fname: e.target.value })}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label style={{ marginRight: "160px", fontSize: "15px", fontWeight: "500" }}>Last name : </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Last name"
                                                onChange={e => this.setState({ lname: e.target.value })}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label style={{ marginRight: "190px", padding: "1px", fontSize: "15px", fontWeight: "500" }}>Email : </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter email"
                                                onChange={e => this.setState({ email: e.target.value })}
                                            />
                                        </div>


                                        <div className="mb-3">
                                            <label style={{ marginRight: "160px", fontSize: "15px", fontWeight: "500" }}>Password : </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Enter Password"
                                                onChange={e => this.setState({ password: e.target.value })}
                                            />
                                        </div>


                                        <div className="d-grid" style={{marginLeft:"88px"}}>
                                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: "red", borderRadius: "8px" }}>Sign up</button>
                                        </div>

                                        <p className="forget-password text-right" style={{ padding: "4px", justifyContent: "center", margin: "1px" }}>
                                            Already have an account? <a href="/sign-in" style={{ color: "red" }}>Login.</a>
                                        </p>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default Signup