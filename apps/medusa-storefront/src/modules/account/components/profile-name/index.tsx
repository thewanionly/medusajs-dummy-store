'use client';

import React, { useActionState, useEffect } from 'react';

import { updateCustomer } from '@lib/data/customer';
import { Customer } from '@lib/gql/generated-types/graphql';
import Input from '@modules/common/components/input';

import AccountInfo from '../account-info';

type MyInformationProps = {
  customer: Customer;
};

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false);

  const updateCustomerName = async (
    _currentState: Record<string, unknown>,
    formData: FormData
  ) => {
    const customer = {
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
    };

    try {
      await updateCustomer(customer);
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.toString() };
    }
  };

  const [state, formAction] = useActionState(updateCustomerName, {
    error: false,
    success: false,
  });

  const clearState = () => {
    setSuccessState(false);
  };

  useEffect(() => {
    setSuccessState(state.success);
  }, [state]);

  return (
    <form action={formAction} className="w-full overflow-visible">
      <AccountInfo
        label="Name"
        currentInfo={`${customer.firstName} ${customer.lastName}`}
        isSuccess={successState}
        isError={!!state?.error}
        clearState={clearState}
        data-testid="account-name-editor"
      >
        <div className="grid grid-cols-2 gap-x-4">
          <Input
            label="First name"
            name="first_name"
            required
            defaultValue={customer.firstName ?? ''}
            data-testid="first-name-input"
          />
          <Input
            label="Last name"
            name="last_name"
            required
            defaultValue={customer.lastName ?? ''}
            data-testid="last-name-input"
          />
        </div>
      </AccountInfo>
    </form>
  );
};

export default ProfileName;
