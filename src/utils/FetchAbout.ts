const API_URL = `${process.env.NEXT_PUBLIC_API}/about`;

export const fetchAboutContents = async (): Promise<AboutContentProps[]> => {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 10 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch about contents: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching about contents:", error);
    throw error;
  }
};
