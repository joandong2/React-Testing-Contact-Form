import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const ContactForm = () => {
    const [data, setData] = useState();
    const { register, errors, handleSubmit, reset } = useForm({
        mode: "onBlur",
    });

    useEffect(() => {
        axios
            .post("https://reqres.in/api/users", {
                data,
            })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [data]);

    const onSubmit = (data) => {
        setData(data);
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
                <div>
                    <label htmlFor="firstName">First Name*</label>
                    <input
                        name="firstName"
                        id="firstName"
                        placeholder="bill"
                        ref={register({ required: true, maxLength: 15 })}
                    />
                    {errors.firstName && (
                        <p>
                            Looks like there was an error:{" "}
                            {errors.firstName.type}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="lastName">Last Name*</label>
                    <input
                        name="lastName"
                        id="lastName"
                        placeholder="luo"
                        ref={register({ required: true })}
                    />
                    {errors.lastName && (
                        <p>
                            Looks like there was an error:{" "}
                            {errors.lastName.type}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="email"
                        placeholder="bluebill1049@hotmail.com"
                    >
                        Email*
                    </label>
                    <input
                        name="email"
                        id="email"
                        ref={register({ required: true })}
                    />
                    {errors.email && (
                        <p>
                            Looks like there was an error: {errors.email.type}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        ref={register({ required: false })}
                    />
                </div>
                {data && (
                    <pre style={{ textAlign: "left", color: "white" }}>
                        <p data-testid="data">Data</p>
                        {JSON.stringify(data, null, 2)}
                    </pre>
                )}
                <input type="submit" value="Submit" data-testid="submit" />
            </form>
        </div>
    );
};

export default ContactForm;
