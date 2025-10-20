import { customerResolvers } from '@graphql/resolvers/customer';
import { GraphQLContext } from '@graphql/types/context';
import Medusa from '@medusajs/js-sdk';
import { BaseCustomerAddress } from '@medusajs/types/dist/http/customer/common';
import { createMockCustomer } from '@mocks/customer';
import { mockMedusa } from '@mocks/medusa';
import type { CategoryService } from '@services/medusa/category';
import type { CollectionService } from '@services/medusa/collection';
import type { ProductService } from '@services/medusa/product';

describe('Customer Resolvers', () => {
  let mockProductService: jest.Mocked<ProductService>;
  let mockCategoryService: jest.Mocked<CategoryService>;
  let mockCollectionService: jest.Mocked<CollectionService>;
  let mockContext: GraphQLContext;

  beforeEach(() => {
    mockProductService = {
      getProducts: jest.fn(),
      getProduct: jest.fn(),
    } as unknown as jest.Mocked<ProductService>;

    mockCategoryService = {
      getCategories: jest.fn(),
      getCategory: jest.fn(),
    } as unknown as jest.Mocked<CategoryService>;

    mockCollectionService = {
      getCollections: jest.fn(),
      getCollection: jest.fn(),
    } as unknown as jest.Mocked<CollectionService>;

    mockContext = {
      medusa: mockMedusa as unknown as Medusa,
      productService: mockProductService,
      categoryService: mockCategoryService,
      collectionService: mockCollectionService,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Query.me', () => {
    it('should retrieve the current customer successfully', async () => {
      const mockCustomer = createMockCustomer({
        id: 'cus_123',
        email: 'john@example.com',
      });
      mockMedusa.store.customer.retrieve.mockResolvedValue({
        customer: mockCustomer,
      });

      const result = await customerResolvers.Query.me({}, {}, mockContext);

      expect(mockMedusa.store.customer.retrieve).toHaveBeenCalledWith({
        fields: '*orders',
      });
      expect(result).toEqual({
        id: mockCustomer.id,
        email: mockCustomer.email,
        firstName: mockCustomer.first_name,
        lastName: mockCustomer.last_name,
        addresses: mockCustomer.addresses.map(
          (address: BaseCustomerAddress) => ({
            id: address.id,
            addressName: address.address_name,
            isDefaultBilling: address.is_default_billing,
            isDefaultShipping: address.is_default_shipping,
            customerId: address.customer_id,
            company: address.company,
            firstName: address.first_name,
            lastName: address.last_name,
            address1: address.address_1,
            address2: address.address_2,
            city: address.city,
            countryCode: address.country_code,
            province: address.province,
            postalCode: address.postal_code,
            phone: address.phone,
          })
        ),
        defaultBillingAddressId: mockCustomer.default_billing_address_id,
        defaultShippingAddressId: mockCustomer.default_shipping_address_id,
        companyName: mockCustomer.company_name,
        phone: mockCustomer.phone,
      });
    });

    it('should handle errors when retrieving customer', async () => {
      const error = new Error('Failed to retrieve customer');
      mockMedusa.store.customer.retrieve.mockRejectedValue(error);

      await expect(
        customerResolvers.Query.me({}, {}, mockContext)
      ).rejects.toThrow('Failed to retrieve customer');
      expect(mockMedusa.store.customer.retrieve).toHaveBeenCalledTimes(1);
    });
  });

  describe('Mutation.login', () => {
    const loginArgs = {
      email: 'john@example.com',
      password: 'password123',
    };

    it('should login customer successfully', async () => {
      const mockToken = 'test-token-123';
      mockMedusa.auth.login.mockResolvedValue(mockToken);

      const result = await customerResolvers.Mutation.login(
        {},
        loginArgs,
        mockContext
      );

      expect(mockMedusa.auth.login).toHaveBeenCalledWith(
        'customer',
        'emailpass',
        loginArgs
      );
      expect(mockMedusa.client.setToken).toHaveBeenCalledWith(mockToken);
      expect(result).toEqual({ token: mockToken });
    });

    it('should handle failed login attempts', async () => {
      mockMedusa.auth.login.mockResolvedValue(null);

      await expect(
        customerResolvers.Mutation.login({}, loginArgs, mockContext)
      ).rejects.toThrow('Unable to login');

      expect(mockMedusa.auth.login).toHaveBeenCalledTimes(1);
      expect(mockMedusa.client.setToken).not.toHaveBeenCalled();
    });

    it('should handle login errors', async () => {
      const error = new Error('Invalid credentials');
      mockMedusa.auth.login.mockRejectedValue(error);

      await expect(
        customerResolvers.Mutation.login({}, loginArgs, mockContext)
      ).rejects.toThrow('Invalid credentials');

      expect(mockMedusa.auth.login).toHaveBeenCalledTimes(1);
      expect(mockMedusa.client.setToken).not.toHaveBeenCalled();
    });
  });
});
