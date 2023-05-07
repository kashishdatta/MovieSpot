/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'

import logo from "../Pages/Components/images/ms-removebg-preview.png"


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

            email: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        window.localStorage.setItem("token","");
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        if (email === "" || password === "") {
            alert("please enter the data first");
        }
        console.log(email, password);
        fetch("http://localhost:5000/login-user", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({

                email,
                password
            }),
        }).then((res) => res.json())
            .then((data) => {
                console.log(data, "User Registered")
                if (data.status === "ok") {
                    alert("Login successful...");
                    window.localStorage.setItem("token", data.data);
                    window.localStorage.setItem("loggedIn", true);
                    window.location.href = "/home"
                }
            })

    }
    render() {
        return (
            <>
                <div className="main" >
                <div className="logo1"><img src={logo} style={{ height: "250px", width: "240px" }}/></div>
                    <div className="sub-main">
                        <div className="imgs">
                            <div className="container-img" >
                                <form onSubmit={this.handleSubmit}>
                                    <h2 style={{ fontWeight: "bold",color:"white", fontSize:"45px",marginLeft:"3.4rem" ,padding:"14px"}}>Login</h2>
                                    <div className="mb-3">

                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="E-mail"
                                            onChange={e => this.setState({ email: e.target.value })}
                                        />
                                    </div>

                                    <div className="mb-3">

                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            onChange={e => this.setState({ password: e.target.value })}
                                        />
                                    </div>



                                    <div className="d-grid" style={{marginLeft:"88px"}}>
                                        <button type="submit" className="btn btn-primary"style={{backgroundColor:"red",borderRadius:"8px",}}>Login</button>
                                    </div>

                                    <p className="forget-password text-right" style={{ padding: "4px", justifyContent: "center",margin: "1px" ,fontSize:"15px"}}>Don't have an account yet?<a href="/sign-up"  style={{color:"red"}}>Sign up</a></p>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default Login