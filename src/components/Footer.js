import styled from "styled-components";
import CompanyNameImage from "../assets/text-logo-white.png";
import CompanyLogo from "../assets/logo-white.png";

function Footer() {
  return (
    <Container>
      <CopyRightContainer>
        <span id="copyrightYear">© 2023 - 2024</span>
        <img src={CompanyNameImage} alt="text-logo" id="companyTextLogo" />
      </CopyRightContainer>
      <img id="companyLogo" src={CompanyLogo} alt="yourAltText" />
      <ContactContainer>
        <a href="mailto:contact@palladiumfloors.com" id="emailLink">
          contact@palladiumfloors.com
        </a>
        <p>123-456-7890</p>
      </ContactContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  background-color: black;
  color: white;
  height: 200px;
  padding: 2rem;

  #companyLogo {
    width: 100px;
    height: 80px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: 300px;
    gap: 10px;

    #companyLogo {
      width: 112px;
      height: 90px;
    }
  }
`;

const CopyRightContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  gap: 5px;

  #companyTextLogo {
    width: 150px;
  }

  #copyrightYear {
    color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;

    #companyTextLogo {
      width: 200px;
    }
  }
`;

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  #companyLogo {
    width: 150px;
  }

  #emailLink {
    color: white;
    text-decoration: none;
  }

  & > * {
    margin: 0;
  }

  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
  }
`;

export default Footer;
