import * as Yup from 'yup';


export const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('Name is required.')
        .min(3, 'To short')
        .max(25, 'To long.'),
    lastName: Yup.string()
        .required('Last name is required.')
        .min(3, 'To short')
        .max(25, 'To long.'),
    email: Yup.string()
        .email('Invalid email')
        .required('The email is required'),
    password: Yup.string()
        .required('The password is required')
        .min(8, 'The password is to short'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], `Password doesn't match.`)
        .required('You need to confirm your password')
})


export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('The email is required'),
    password: Yup.string()
        .required('The password is required')
        .min(8, 'To short..')
})

