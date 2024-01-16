// api.ts

const API_BASE_URL = "http://localhost:3000"; // Replace with your actual API base URL

interface useApiEndpoints {
  deleteAttribute: (id: string) => Promise<any>;
  fetchLabels: (offset: number) => Promise<any>;
}

const useApi = (): useApiEndpoints => {
  const deleteAttribute = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/attributes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete attribute");
    }

    const data = await response.json();
    return data;
  };

  const fetchLabels = async (offset: number = 0) => {
    const response = await fetch(`${API_BASE_URL}/labels?offset=${offset}`);
    const parsedLabelsResponse = await response.json();
    return parsedLabelsResponse;
  };

  return {
    deleteAttribute,
    fetchLabels,
  };
};

export default useApi;
