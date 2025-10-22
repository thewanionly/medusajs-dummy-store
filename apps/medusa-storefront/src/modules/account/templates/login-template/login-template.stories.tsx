import {
  LoginTemplate,
  LoginTemplateProps,
} from '@modules/account/templates/login-template';
import { Meta, StoryObj } from '@storybook/nextjs';

import {
  LOGIN_DESCRIPTION,
  LOGIN_HEADING,
} from '../../components/login/constants';
import {
  REGISTER_DESCRIPTION,
  REGISTER_HEADING,
} from '../../components/register/constants';

const meta = {
  title: 'LoginTemplate',
  component: LoginTemplate,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [['countryCode', 'dk']],
      },
    },
  },
} satisfies Meta<typeof LoginTemplate>;
export default meta;

type Story = StoryObj<typeof meta>;

const mockedProps: LoginTemplateProps = {
  loginHeading: LOGIN_HEADING,
  loginDescription: LOGIN_DESCRIPTION,
  registerHeading: REGISTER_HEADING,
  registerDescription: REGISTER_DESCRIPTION,
};

export const Default: Story = {
  args: { ...mockedProps },
};
