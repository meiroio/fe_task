export const API_BASE = 'http://127.0.0.1:3000/';

export const API_EP = {
  getAttributes: '/attributes',
  getAttributesDetail: (id?: string) => `/attributes/${id}`,
  deleteAttributesDetail: (id?: string) => `/attributes/${id}`,
  getLabels: '/labels',
};
