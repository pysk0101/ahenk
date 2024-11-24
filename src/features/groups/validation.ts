import * as yup from 'yup';

export const createGroupSchema = yup.object().shape({
    name: yup.string().required(),
    leaderId: yup.string().required(),
});

