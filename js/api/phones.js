const API_URL = 'https://mgrinko.github.io/js-20190221/api';

export const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/phones.json`);
    return await response.json();
  } catch (e) {
    return [];
  }
};

export const getById = async (phoneId) => {
  try {
    const response = await fetch(`${API_URL}/phones/${phoneId}.json`);
    return await response.json();
  } catch (e) {
    return 0;
  }
};
