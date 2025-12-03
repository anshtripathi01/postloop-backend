import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const LINKEDIN_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken";
const LINKEDIN_ME_URL = "https://api.linkedin.com/v2/me";
const LINKEDIN_EMAIL_URL = "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))";
const LINKEDIN_POST_URL = "https://api.linkedin.com/v2/ugcPosts";

export const getAccessToken = async (code, redirectUri) => {
  try {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    });

    const res = await axios.post(LINKEDIN_TOKEN_URL, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return res.data;
  } catch (err) {
    console.error("LinkedIn Token Exchange Error:", err.response?.data || err);
    throw new Error("Failed to get access token");
  }
};


export const getLinkedInProfile = async (accessToken) => {
  try {
    const me = await axios.get(LINKEDIN_ME_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const email = await axios.get(LINKEDIN_EMAIL_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return {
      id: me.data.id,
      firstName: me.data.localizedFirstName,
      lastName: me.data.localizedLastName,
      email: email.data.elements[0]["handle~"].emailAddress,
    };

  } catch (err) {
    console.error("LinkedIn Profile Fetch Error:", err.response?.data || err);
    throw new Error("Failed to fetch LinkedIn profile");
  }
};


export const postOnLinkedIn = async (accessToken, userId, text) => {
  try {
    const postData = {
      author: `urn:li:person:${userId}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text,
          },
          shareMediaCategory: "NONE",
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    };

    const res = await axios.post(LINKEDIN_POST_URL, postData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
    });

    return res.data;

  } catch (err) {
    console.error("LinkedIn Post Error:", err.response?.data || err);
    throw new Error("Failed to post on LinkedIn");
  }
};
