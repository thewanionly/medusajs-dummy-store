export const mockMedusa = {
  store: {
    product: {
      list: jest.fn(),
      retrieve: jest.fn(),
    },
    category: {
      list: jest.fn(),
      retrieve: jest.fn(),
    },
    collection: {
      list: jest.fn(),
      retrieve: jest.fn(),
    },
  },
};
