import { defineRouteConfig } from '@medusajs/admin-sdk';
import { Button, Container, Heading, toast } from '@medusajs/ui';
import { useMutation } from '@tanstack/react-query';

import { sdk } from '../../../lib/sdk';

const ShopifyMigrationPage = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      sdk.client.fetch('/admin/shopify/migrate-products', {
        method: 'POST',
      }),
    onSuccess: () => {
      toast.success('Successfully triggered product migration from Shopify');
    },
    onError: (err) => {
      console.error(err);
      toast.error('Failed to migrate product from Shopify');
    },
  });

  const handleSync = () => {
    mutate();
  };

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Shopify Product Migration</Heading>
      </div>
      <div className="px-6 py-8">
        <Button variant="primary" onClick={handleSync} isLoading={isPending}>
          Migrate Product from Shopify
        </Button>
      </div>
    </Container>
  );
};

export const config = defineRouteConfig({
  label: 'Shopify Migration',
});

export default ShopifyMigrationPage;
