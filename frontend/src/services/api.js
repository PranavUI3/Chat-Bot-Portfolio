const API_URL = "http://127.0.0.1:8000";

export const analyzeJobDescription = async (jobDescription) => {
  try {
    const response = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        job_description: jobDescription,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to analyze job description");
    }

    const data = await response.json();

    console.log("Backend response:", data);

    return data;

    return data;
  } catch (error) {
    console.error("Error analyzing job description:", error);
    throw error;
  }
};
