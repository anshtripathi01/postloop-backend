import axios from "axios";
import LinkedInPage from "../models/LinkedinPage.js";
import User from "../models/User.js";

export const getLinkedInAuthUrl = (req, res) => {
  const redirect = process.env.LINKEDIN_REDIRECT_URI;

  const url =
    "https://www.linkedin.com/oauth/v2/authorization" +
    `?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}` +
    `&redirect_uri=${redirect}` +
    "&scope=r_liteprofile r_emailaddress w_member_social w_organization_social rw_organization_admin";

  res.json({ url });
};

export const linkedInCallback = async (req, res) => {
  try {
    const { code } = req.query;

    // GET ACCESS TOKEN
    const tokenRes = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
          client_id: process.env.LINKEDIN_CLIENT_ID,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        },
      }
    );

    const accessToken = tokenRes.data.access_token;

    await User.findByIdAndUpdate(req.user.id, { linkedinAccessToken: accessToken });

    res.redirect(process.env.FRONTEND_URL + "/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed" });
  }
};

export const getLinkedInPages = async (req, res) => {
  const pages = await LinkedInPage.find({ userId: req.user.id });
  res.json({ pages });
};
