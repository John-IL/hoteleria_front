export default [
  {
    header: 'Pages',
    icon: 'FileTextIcon',
    children: [
      {
        title: 'Authentication',
        icon: 'LockIcon',
        children: [
          {
            title: 'Login v1',
            route: 'auth-login-v1',
            target: '_blank',
          },
          {
            title: 'Login v2',
            route: 'auth-login-v2',
            target: '_blank',
          },
          {
            title: 'Register v1',
            route: 'auth-register-v1',
            target: '_blank',
          },
          {
            title: 'Register v2',
            route: 'auth-register-v2',
            target: '_blank',
          },
          {
            title: 'Forgot Password v1',
            route: 'auth-forgot-password-v1',
            target: '_blank',
          },
          {
            title: 'Forgot Password v2',
            route: 'auth-forgot-password-v2',
            target: '_blank',
          },
          {
            title: 'Reset Password v1',
            route: 'auth-reset-password-v1',
            target: '_blank',
          },
          {
            title: 'Reset Password v2',
            route: 'auth-reset-password-v2',
            target: '_blank',
          },
        ],
      },
      {
        title: 'Account Settings',
        route: 'pages-account-setting',
        icon: 'SettingsIcon',
      },
      {
        title: 'Profile',
        route: 'pages-profile',
        icon: 'UserIcon',
      },
      {
        title: 'Faq',
        route: 'pages-faq',
        icon: 'HelpCircleIcon',
      },
      {
        title: 'Knowledge Base',
        route: 'pages-knowledge-base',
        icon: 'AlertCircleIcon',
      },
      {
        title: 'Pricing',
        route: 'pages-pricing',
        icon: 'DollarSignIcon',
      },
      {
        title: 'Miscellaneous',
        icon: 'FileIcon',
        children: [
          {
            title: 'Coming Soon',
            route: 'misc-coming-soon',
            target: '_blank',
          },
          {
            title: 'Not Authorized',
            route: 'misc-not-authorized',
            target: '_blank',
          },
          {
            title: 'Under Maintenance',
            route: 'misc-under-maintenance',
            target: '_blank',
          },
          {
            title: 'Error',
            route: 'misc-error',
            target: '_blank',
          },
        ],
      },
    ],
  },
]
