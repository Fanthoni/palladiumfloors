import axios from "axios";

export const sendMail = async (name, email, inquiry) => {
  const requestBody = {
    Message: inquiry,
    Email: email,
    Name: name,
  };

  const { data } = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/mail/send`,
    requestBody
  );

  return data;
};
