import React from "react";
import "./aboutSection.css";
import { Button ,Typography, Avatar} from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/daring_pratibhaa?igshid=MzMyNGUyNmU2YQ==";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dqk3cyfxz/image/upload/v1695638601/profileImages/avtars/ccbce39ec18a4842e694a9a6bf19318e_gxsozj.jpg"
              alt="Founder"
            />
            <Typography>Pratibha</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @Pratibha. Only with the
              purpose to make my 1st assignment successfull.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/@daring_pratibha"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com/daring_pratibhaa?igshid=MzMyNGUyNmU2YQ==" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
