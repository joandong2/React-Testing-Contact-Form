import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import ContactForm from "../components/ContactForm.js";

test("renders ContactForm", () => {
    render(<ContactForm />);
});

test("check if fields are working", () => {
    const { getByLabelText } = render(<ContactForm />);
    const fname = getByLabelText(/first name/i);
    const lname = getByLabelText(/last name/i);
    const email = getByLabelText(/email/i);
    const message = getByLabelText(/message/i);

    fireEvent.change(fname, { target: { value: "Johhhnnnyyyy" } });
    fireEvent.change(lname, { target: { value: "Doe" } });
    fireEvent.change(email, { target: { value: "johndoe@me.com" } });
    fireEvent.change(message, { target: { value: "Lorem ipsum dolor" } });

    expect(fname.value).toBe("Johhhnnnyyyy");
    expect(lname.value).toBe("Doe");
    expect(email.value).toBe("johndoe@me.com");
    expect(message.value).toBe("Lorem ipsum dolor");
});

test("form submit is firing", async () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<ContactForm onSubmit={onSubmit} />);
    fireEvent.submit(getByTestId("form"));

    // when testing, code that causes React state updates should be wrapped into act(...):
    // this means that something changed for state inside the test, we need to wait for these changes
    // if we remove wait, eexpect would become asych thus firing together with onSubmit resulting false
    wait(() => {
        expect(onSubmit).toHaveBeenCalled();
    });

    //expect(getByText(/submit/i)).toBeInTheDocument();
});
