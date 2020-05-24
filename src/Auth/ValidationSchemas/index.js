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


export const ProfileSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('Your name is required.')
        .min(3, 'To short')
        .max(25, 'To long.'),
    lastName: Yup.string()
        .required('Your last name is required.')
        .min(3, 'To short')
        .max(25, 'To long.'),
    email: Yup.string()
        .email('Invalid email')
        .required('The email is required'),
    password: Yup.string()
        .min(8, 'The password is to short'),
    confirmPassword: Yup.string()
        .when("password", {
            is: val => val && val.length > 0,
            then: Yup.string()
                .oneOf([Yup.ref("password")], "Both passwords need to be the same")
                .required()
        }),
})

export const NotesSchema = Yup.object().shape({
    note: Yup.string()
        .required('The todo is required')
        .min(4, 'To short.')
})