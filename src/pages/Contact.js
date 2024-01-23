import { useState, useRef } from "react";
import styled from "styled-components";
import Menu from "../components/Menu";
import { TextInput, Button } from "../components/FormComponent";
import { Snackbar, Alert } from "@mui/material";

import background from "../assets/contactImages/background.png";
import contactImg from "../assets/contactImages/contact.png";

import { sendMail } from "../services/api/MailApi";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiry: "",
  });
  const formRef = useRef(null);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendMail(formData.name, formData.email, formData.inquiry);
      formRef.current.reset();
      setSuccessSnackbar(true);
    } catch (e) {
      console.error(`Error when sending message: ${e}`);
      setErrorSnackbar(true);
    }

    return;
  };

  return (
    <Container>
      <PageContainer>
        <img src={contactImg} alt="contact" />
        <FormContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Contact Us</h1>
            <Menu />
          </div>
          <Form onSubmit={onSubmit} ref={formRef}>
            <TextInput.TextBox
              displayName="Name"
              fieldName="name"
              isRequired={true}
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextInput.EmailTextBox
              displayName="Email"
              fieldName="email"
              isRequired={true}
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextInput.TextArea
              displayName="Inquiry"
              fieldName="inquiry"
              isRequired={true}
              value={formData.inquiry}
              onChange={handleInputChange}
            />
            <Button.SubmitButton style={{ marginTop: "2rem" }} />
          </Form>
        </FormContainer>
        <BusinessInfoContainer>
          <h3>phone</h3>
          <p>+1(555) 555-1234</p>
          <h3>email</h3>
          <p>contact@palladiumfloors.com</p>
          <h3>based in</h3>
          <p>California, USA</p>
        </BusinessInfoContainer>
      </PageContainer>
      <Snackbar
        open={successSnackbar || errorSnackbar}
        autoHideDuration={5000}
        onClose={() => {
          setErrorSnackbar(false);
          setSuccessSnackbar(false);
        }}
      >
        <Alert
          onClose={() => {
            setErrorSnackbar(false);
            setSuccessSnackbar(false);
          }}
          severity={errorSnackbar ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorSnackbar
            ? "Error when sending message"
            : "Message has been sent!"}
        </Alert>
      </Snackbar>
    </Container>
  );
}

const Container = styled.div`
  height: auto;
  display: flex;
  background-image: url(${background});
  padding: 4rem;
  height: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PageContainer = styled.div`
  img {
    width: 33%;
    border-radius: 5px;
    object-fit: cover;
  }

  background-color: #b1a698;
  max-width: 1000px;
  min-width: 200px;
  display: flex;
  padding: 2rem;
  border-radius: 5px;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 75%;

    img {
      display: none;
    }
  }
`;

const FormContainer = styled.div`
  h1 {
    margin: 0.5rem 0;
  }

  display: flex;
  flex-direction: column;
  border-radius: 10px;
  gap: 15px;
  width: 35%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BusinessInfoContainer = styled.div`
  width: auto;
  h3 {
    margin-top: 1rem;
  }

  & > * {
    margin: 0;
  }
`;

export default Contact;
