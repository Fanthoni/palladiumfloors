import logo from "../assets/logo.png"
import Menu from "../components/Menu"
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';

import styled from "styled-components";
const _ = require('lodash');

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {return  images[item.replace('./', '')] = r(item); });
    return images;
  }

function Home() {
  const cardImages = importAll(
    require.context("../assets/cardImages", false, /\.(png|jpe?g)$/)
  );
  let galleryImages = importAll(
    require.context("../assets/galleryImages", false, /\.(png|jpe?g)$/)
  );
  galleryImages = _.values(galleryImages);

  return (
    <ContainerWrapper>
      <Container>
        <PageContainer>
          <NavigationContainer>
            <span>
              <img
                id="logo"
                src={logo}
                alt="logo"
                style={{ display: "block" }}
              />
            </span>
            <Menu />
          </NavigationContainer>

          <IntroductoryContainer>
            <h1 id="title">Adding Elegance and Expertise to Your Space</h1>
            <p id="description">
              we bring touch of elegance and a wealth of expertise to your
              floors, ensuring that every step you take is a step in luxury and
              style
            </p>

            <ContactContainer>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 5,
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
                className="contact-btn"
              >
                Call Now
              </Button>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 5,
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
                className="contact-btn"
              >
                <EmailIcon />
              </Button>
            </ContactContainer>
          </IntroductoryContainer>

          <SliderContainer>
            <FlooringCard
              backgroundImage={cardImages["hardwood.jpeg"]}
              title="Hardwood"
            />
            <FlooringCard
              backgroundImage={cardImages["vinyl.jpeg"]}
              title="Vinyl"
            />
            <FlooringCard
              backgroundImage={cardImages["laminated.jpeg"]}
              title="Laminated"
            />
            <FlooringCard
              backgroundImage={cardImages["others.jpeg"]}
              title="View all"
            />
          </SliderContainer>
        </PageContainer>
        <GalleryContainer>
          <Gallery items={galleryImages} />
        </GalleryContainer>
      </Container>
    </ContainerWrapper>
  );
}

const ContainerWrapper = styled.div`
  justify-content: center;
  display: flex;
  margin: 2em;
`;

const Container = styled.div`
  margin: 2rem;

  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 2rem;
  max-width: 1000px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;

    & > * {
      width: 100% !important;
    }
  }
`;

const PageContainer = styled.div`
  width: 50%;

  Button {
    text-transform: none;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  #logo {
    width: 150px;
  }
`;

const IntroductoryContainer = styled.div`
  display: flex;
  flex-direction: column;

  #title,
  #description {
    width: 80%;
  }

  #description {
    margin-top: 0;
    margin-bottom: 2rem;
  }

  .contact-btn {
    background-color: black;
  }
`;

const ContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  overflow: auto;
  width: 90%;

  margin-top: 2rem;
  padding-top: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const GalleryContainer = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    // transform: translate(-10px);
  }
`;

function FlooringCard({ backgroundImage, title, href }) {
  return (
    <CardContainer
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Button
        variant="contained"
        sx={{
          borderRadius: 5,
          "&:hover": {
            backgroundColor: "white",
          },
        }}
        size="small"
      >
        {title}
      </Button>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  height: 150px;
  min-width: 80px;
  padding: 1rem;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    transition: transform 0.5s ease;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  &:not(:hover) {
    transform: translateY(0);
    transition: transform 0.5s ease;
    box-shadow: none;
  }

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  Button {
    background-color: white;
    color: black;
  }
`;

function Gallery({items}) {
    const imageLimitCount = window.innerWidth > 768 ? 4 : 2;
    return (
        <GalleryCardContainer>
            {items.map((image, index) => {
                if (index <= imageLimitCount) {
                    return (
                            <img className="galleryImage" src={image} key={index} alt="gallery"/>
                    )
                }
                return null;
            })}
        </GalleryCardContainer>
    );
}

const GalleryCardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 20%);
    grid-template-rows: repeat(5, 100px);
    max-height: 100%;
    border-radius: 10px;

    @media (max-width: 768px) {
        grid-template-rows: repeat(2, 100px);
    }

    .galleryImage {
        display: block;
        height: 100%;
        width: 100%;
        object-fit: cover;
        border: 10px solid white;


        &:first-child {
            grid-column: span 2;
        }
        &:nth-child(2) {
            grid-column: span 3;
        }
        &:nth-child(3) {
            grid-column: span 5;
            grid-row: span 2;

            @media (max-width: 768px) {
                grid-row: span 1;
            }
        }
        &:nth-child(4) {
            grid-column: span 2;
            grid-row: span 2;
        }
        &:nth-child(5) {
            grid-column: span 3;
            grid-row: span 2;
        }
    }

`;

export default Home;