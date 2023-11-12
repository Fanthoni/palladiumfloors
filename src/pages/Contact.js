import styled from "styled-components";
import Menu from "../components/Menu";
import background from "../assets/contactImages/background.png";
import { TextInput, Button } from "../components/FormComponent";
import contactImg from "../assets/contactImages/contact.png";

function Contact() {
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
          {/* <form> */}
          <TextInput.TextBox
            displayName="Name"
            fieldName="name"
            isRequired={true}
          />
          <TextInput.TextBox
            displayName="Email"
            fieldName="email"
            isRequired={true}
          />
          <TextInput.TextArea
            displayName="Inquiry"
            fieldName="inquiry"
            isRequired={true}
          />
          <Button.SubmitButton />
          {/* </form> */}
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
