"use server";

const Download = async (content: string) => {
  try {
    const formdata = new URLSearchParams();
    formdata.append("markdown", content);
    console.log("Download button is working properly.");
    const response = await fetch("https://md-to-pdf-hqx4.onrender.com/", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formdata,
    });

    if (!response.ok) {
      console.error("Failed to convert PDF");
      // Handle
      return {
        status: false,
        content: null,
      };
    }

    const blob = await response.blob();
    return {
      status: true,
      content: blob,
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      content: null,
    };
  }
};

export default Download;
