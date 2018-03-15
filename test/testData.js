const user = {
  email: 'hogan.developer@gmail.com',
  password: '123'
}

const validEmails = ['email@domain.com',
  'firstname.lastname@domain.com',
  'email@subdomain.domain.com',
  'firstname+lastname@domain.com',
  'email@[123.123.123.123]',
  '"email"@domain.com',
  '1234567890@domain.com',
  'email@domain-one.com',
  '_______@domain.com',
  'email@domain.name',
  'email@domain.co.jp',
  'firstname-lastname@domain.com'
];

const invalidEmails = [
  'plainaddress',
  '#@%^%#$@#$@#.com',
  '@domain.com',
  'Joe Smith <email@domain.com>',
  'email.domain.com',
  'email@domain@domain.com',
  '.email@domain.com',
  'email.@domain.com',
  'email..email@domain.com',
  'email@domain.com (Joe Smith)',
  'email@domain',
  'email@111.222.333.44444',
  'email@domain..com'
];

module.exports = { user, validEmails, invalidEmails };
